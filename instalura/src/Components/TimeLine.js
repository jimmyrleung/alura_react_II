import React, { Component } from 'react';
import Foto from './Foto';

export default class Timeline extends Component {
    constructor() {
        super();
        this.state = { fotos: [] };
    }

    componentDidMount() {
        fetch("http://localhost:3002/api/photos")
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos })
            })
            .catch(err => console.log("Erro ao buscar as fotos."));
    };

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <Foto foto={foto} />)
                }
            </div>
        );
    };
}