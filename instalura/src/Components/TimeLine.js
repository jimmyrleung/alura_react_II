import React, { Component } from 'react';
import Foto from './Foto';

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

    componentDidMount() {
        this.carregaTimeLine();
    };

    carregaTimeLine() {
        const requestInfo = {
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("auth-token")
            })
        };

        fetch(`http://localhost:3002/api/photos${this.username ? `/${this.username}` : ""}`, requestInfo)
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