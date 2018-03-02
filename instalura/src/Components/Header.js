import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {
    filtrarTimeline(evt) {
        evt.preventDefault();
        PubSub.publish("filtrar-timeline", { text: this.pesquisaText.value });
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">Instalura</h1>

                <form className="header-busca" onSubmit={this.filtrarTimeline.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={(input) => this.pesquisaText = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            {/*                 ♥ */}
                            {/* Quem deu like nas minhas fotos */}
                            <a>♡</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}