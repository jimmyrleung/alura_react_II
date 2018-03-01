import React, { Component } from 'react';
import Request from '../services/Request';

export default class Login extends Component {

    constructor() {
        super();
        this.state = { msg: "" };
    };

    login(evt) {
        evt.preventDefault();
        // const: utilizamos quando a variável terá um valor atribuído e este não será mais alterado
        const url = "http://localhost:3002/api/login";
        Request.send(url, "POST", false, { username: this.username.value, password: this.password.value })
            .then(response => {
                console.log(response.token);
                localStorage.setItem("auth-token", response.token);
                this.props.history.push("/timeline");
            })
            .catch(err => this.setState({ msg: (err.message ? err.message : "Não foi possível fazer login.") }));
    };

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.login.bind(this)}>
                    {/* O ref faz uma referência para esse input (o input inteiro e não só seu valor) */}
                    {/* Note que não salvamos as informações do input no state pois não há necessidade - O state está ligado a renderização */}
                    <input type="text" ref={(input) => this.username = input} />
                    <input type="password" ref={(input) => this.password = input} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    };
}