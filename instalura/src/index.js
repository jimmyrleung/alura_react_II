import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Logout from './Components/Logout';

function AuthenticatedRoute({ component: Component, authed, ...rest }) {
    console.log(...rest);
    return (
        <Route
            {...rest}
            render={(props) => authed ?
                <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}

function LoginRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed ?
                <Redirect to={{ pathname: '/timeline', state: { from: props.location } }} /> : <Component {...props} />}
        />
    )
}

function checkAuthorization() {
    return !!localStorage.getItem("auth-token");
    // Check on server if the token is valid
}

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <Switch>{/* Dentro do switch declaramos nossas rotas. O switch garante que apenas uma delas será acionada. */}
            <LoginRoute authed={checkAuthorization()} exact path="/" component={Login} />

            {/*TODO: Estrategia para timeline publica. Exemplo: para /timeline o usuário deve estar logado 
                mas para /timeline/jimmyrl deve-se acessar normalmente*/}
            <AuthenticatedRoute authed={checkAuthorization()} path="/timeline/:username?" component={App} />
            
            <AuthenticatedRoute authed={checkAuthorization()} path="/logout" component={Logout} />
        </Switch>
    </Router>
    , document.getElementById('root'));

registerServiceWorker();
