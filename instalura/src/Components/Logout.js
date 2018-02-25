import { Component } from 'react';

export default class Logout extends Component {
    // Utilizamos o componentWillMonunt pois nada será renderizado
    // e sendo assim não precisamos esperar o componente ser montado
    componentWillMount() {
        localStorage.removeItem("auth-token");
        this.props.history.push("/");
    }

    render() {
        // Caso nosso componente seja um componente que não tem uma view em si, podemos retornar null no render
        return null;
    }
}