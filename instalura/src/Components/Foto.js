import React, { Component } from 'react';

class FotoAtualizacoes extends Component {
    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar" className="fotoAtualizacoes-form-submit" />
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {this.props.foto.likers.length > 0 ? "♡ " : ""}
                    {
                        this.props.foto.likers.map(liker => <a href="#">{liker}</a>)
                    }
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.username} </a>
                    {this.props.foto.description}
                </p>

                <ul className="foto-info-comentarios">
                    <li className="comentario">
                        <a className="foto-info-autor">seguidor </a>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                </li>
                    <li className="comentario">
                        <a className="foto-info-autor">seguidor </a>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
                </li>
                    <li className="comentario">
                        <a className="foto-info-autor">seguidor </a>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
                </li>
                </ul>
            </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src="https://instagram.fcgh9-1.fna.fbcdn.net/vp/6170cb0de16a8ec01b9760e19a69b600/5B2B15DA/t51.2885-19/10518184_411719108989377_1218968099_a.jpg" alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <a href="#">{this.props.foto.username}</a>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.date}</time>
            </header>
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
                <FotoAtualizacoes />
            </div>
        );
    }
}