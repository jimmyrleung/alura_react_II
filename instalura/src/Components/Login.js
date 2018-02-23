import React, { Component } from 'react';

export default class Login extends Component {

    constructor() {
        super();
        this.state = { msg: "" };
    };

    login(evt) {
        evt.preventDefault();

        // const: utilizamos quando a variável terá um valor atribuído e este não será mais alterado
        const requestInfo = {
            method: "POST",
            body: JSON.stringify({ username: this.username.value, password: this.password.value }),
            headers: new Headers({ "Content-type": "application/json" })
        };

        fetch("http://localhost:3002/api/login", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    this.setState({ msg: "Não foi possível fazer login." });
                }
            })
            .then(token => {
                console.log(token);
            })
            .catch(err => this.setState({ msg: "Erro ao fazer login." }));
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