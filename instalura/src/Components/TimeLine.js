import React, { Component } from 'react';
import Foto from './Foto';
import PubSub from 'pubsub-js';
import Request from '../services/Request';

// Container Component
export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.username = this.props.params.username;
    }

    // Quando chamamos por exemplo /timeline, nosso componente é instanciado e carrega o componentDidMount
    // Quando chamamos /timeline/user o componente não carrega o componentDidMount pois entende que somente
    // um parâmetro foi alterado. Portanto, para "forçarmos" um recarregamento nós temos que recorrer ao
    // componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        this.username = nextProps.params.username || null;
        this.carregaTimeLine();
    }

    componentWillMount() {
        const commentsUrl = `http://localhost:3002/api/photos/fotoId/comments`;
        const likesUrl = `http://localhost:3002/api/photos/fotoId/likes`;

        PubSub.subscribe("filtrar-timeline", (topico, data) => this.carregaTimeLine(`?p=${data.text}`));

        PubSub.subscribe("atualiza-likers", (topico, data) => {
            Request.send(likesUrl.replace("fotoId", data.fotoId), "GET", true)
                .then((result) => {
                    let fotoLikeada = this.state.fotos.find(f => f.id === data.fotoId);
                    fotoLikeada.isLiked = data.isLiked;
                    fotoLikeada.likers = result.likers;
                    this.setState({ fotos: this.state.fotos });
                })
                .catch(err => console.log(err.message));
        });

        PubSub.subscribe("atualiza-comentarios", (topico, data) => {
            Request.send(commentsUrl.replace("fotoId", data.fotoId), "GET", true)
                .then((result) => {
                    let fotoComentada = this.state.fotos.find(f => f.id === data.fotoId);
                    fotoComentada.comments = result.comments;
                    this.setState({ fotos: this.state.fotos });
                })
                .catch(err => console.log(err.message));
        });
    };

    componentDidMount() {
        this.carregaTimeLine();
    };

    carregaTimeLine(queryParams) {
        let url = `http://localhost:3002/api/photos${this.username ? `/${this.username}` : ""}`;
        Request.send(url, "GET", true, null)
            .then(fotos => {
                this.setState({ fotos: fotos });
            })
            .catch(err => console.log(err));
    };

    like(fotoId) {
        const url = `http://localhost:3002/api/photos/${fotoId}/likes`;
        Request.send(url, "POST", true)
            .then(response => {
                //this.setState({ fotos: this.state.fotos }); levar para o componentwillmount após refactor

                // Como teremos 'n' componentes 'foto', todos eles estarão inscritos no evento 'atualiza-likers', portanto,
                // precisamos passar o id para que ocorra a atualização somente na foto que está recebendo o like
                PubSub.publish("atualiza-likers", { fotoId, isLiked: response.isLiked });
            })
            .catch(err => console.log(err.message));
    };

    comentar(fotoId, comentario) {
        const url = `http://localhost:3002/api/photos/${fotoId}/comments`;

        Request.send(url, "POST", true, { comment: comentario })
            .then(response => {
                PubSub.publish("atualiza-comentarios", { fotoId });
            })
            .catch(err => console.log(err.message));
    };

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <Foto key={foto.id} foto={foto} like={this.like} comentar={this.comentar} />)
                }
            </div>
        );
    };
}