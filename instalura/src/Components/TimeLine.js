import React, { Component } from 'react';
import Foto from './Foto';
import PubSub from 'pubsub-js';

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
        console.log(nextProps);
        this.username = nextProps.params.username || null;
        console.log(this.username);
        this.carregaTimeLine();
    }

    componentWillMount() {
        PubSub.subscribe("filtrar-timeline", (topico, data) => this.carregaTimeLine(`?p=${data.text}`));
    };

    componentDidMount() {
        this.carregaTimeLine();
    };

    carregaTimeLine(queryParams) {
        const requestInfo = {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("auth-token")
            })
        };

        let url = `http://localhost:3002/api/photos${this.username ? `/${this.username}` : ""}`

        if (queryParams) {
            url += queryParams;
        }

        fetch(url, requestInfo)
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos });
            })
            .catch(err => console.log("Erro ao buscar as fotos."));
    };

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <Foto key={foto.id} foto={foto} />)
                }
            </div>
        );
    };
}