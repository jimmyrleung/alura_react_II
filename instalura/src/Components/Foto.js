import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src="https://instagram.fcgh9-1.fna.fbcdn.net/vp/6170cb0de16a8ec01b9760e19a69b600/5B2B15DA/t51.2885-19/10518184_411719108989377_1218968099_a.jpg" alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.username}`}>{this.props.foto.username}</Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.date}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { likers: this.props.foto.likers, comentarios: this.props.foto.comments };
    }

    componentDidMount() {
        const requestInfo = {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("auth-token")
            })
        };

        PubSub.subscribe("atualiza-likers", (topico, data) => {
            if (this.props.foto.id === data.fotoId) {
                fetch(`http://localhost:3002/api/photos/${this.props.foto.id}/likes`, requestInfo)
                    .then(response => Promise.all([response.ok, response.json()]))
                    // Usamos destructuring ao invés de .spread pois o .spread não é um recurso nativo das promises
                    .then(([isResponseOk, responseBody]) => {
                        if (isResponseOk) {
                            this.setState({ likers: responseBody.likers });
                        }
                        else {
                            throw new Error("Erro ao carregar lista de likers.");
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });

        PubSub.subscribe("atualiza-comentarios", (topico, data) => {
            console.log(data);
            if (this.props.foto.id === data.fotoId) {
                fetch(`http://localhost:3002/api/photos/${this.props.foto.id}/comments`, requestInfo)
                    .then(response => Promise.all([response.ok, response.json()]))
                    // Usamos destructuring ao invés de .spread pois o .spread não é um recurso nativo das promises
                    .then(([isResponseOk, responseBody]) => {
                        if (isResponseOk) {
                            this.setState({ comentarios: responseBody.comments });
                        }
                        else {
                            throw new Error("Erro ao carregar lista de comentários.");
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });
    };

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {this.state.likers.length > 0 ? "♡ " : ""}
                    {
                        this.state.likers.map((liker, i) => {
                            return this.state.likers.length - 1 !== i ?
                                <span><Link key={liker} to={`/timeline/${liker}`}>{liker}</Link>, </span> :
                                <span><Link key={liker} to={`/timeline/${liker}`}>{liker}</Link></span>
                        })
                    }
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.username} </a>
                    {this.props.foto.description}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.state.comentarios.map(comentario =>
                            <li className="comentario" key={comentario.text}>
                                <Link className="foto-info-autor" to={`/timeline/${comentario.username}`}>{comentario.username}</Link>
                                {" " + comentario.text}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props);

        // Precisamos que o componente seja recarregado com a classe certa
        this.state = { isLiked: this.props.foto.isLiked };
    };

    like(evt) {
        evt.preventDefault();

        const requestInfo = {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("auth-token")
            })
        };

        fetch(`http://localhost:3002/api/photos/${this.props.foto.id}/likes`, requestInfo)
            .then(response => Promise.all([response.ok, response.json()]))
            // Usamos destructuring ao invés de .spread pois o .spread não é um recurso nativo das promises
            .then(([isResponseOk, responseBody]) => {
                if (isResponseOk) {
                    console.log(responseBody);
                    this.setState({ isLiked: responseBody.isLiked });

                    // Como teremos 'n' componentes 'foto', todos eles estarão inscritos no evento 'atualiza-likers', portanto,
                    // precisamos passar o id para que ocorra a atualização somente na foto que está recebendo o like
                    PubSub.publish("atualiza-likers", {
                        fotoId: this.props.foto.id
                    });
                }
                else {
                    throw new Error("Erro ao curtir a foto.")
                }
            })
            .catch(err => console.log(err.message));
    };

    comentar(evt) {
        evt.preventDefault();

        const requestInfo = {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("auth-token")
            }),
            body: JSON.stringify({ comment: this.comentario.value })
        };

        fetch(`http://localhost:3002/api/photos/${this.props.foto.id}/comments`, requestInfo)
            .then(response => Promise.all([response.ok, response.json()]))
            // Usamos destructuring ao invés de .spread pois o .spread não é um recurso nativo das promises
            .then(([isResponseOk, responseBody]) => {

                if (isResponseOk) {
                    //console.log(responseBody);

                    // Como teremos 'n' componentes 'foto', todos eles estarão inscritos no evento 'atualiza-comentarios', portanto,
                    // precisamos passar o id para que ocorra a atualização somente na foto que está recebendo o like
                    PubSub.publish("atualiza-comentarios", {
                        fotoId: this.props.foto.id
                    });
                }
                else {
                    throw new Error("Erro ao adicionar comentário.")
                }
            })
            .catch(err => console.log(err.message));
    };

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} href="#" className={this.state.isLiked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={(input) => this.comentario = input} />
                    <input type="submit" value="Comentar" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}


export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.url} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes foto={this.props.foto} />
            </div>
        );
    }
}