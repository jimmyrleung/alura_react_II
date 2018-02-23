import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Timeline from './Components/TimeLine';
import Login from './Components/Login';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <Switch>{/* Dentro do switch declaramos nossas rotas. O switch garante que apenas uma delas será acionada. */}
            <Route exact path="/" component={Login} />
            <Route path="/timeline" component={App} />
        </Switch>
    </Router>
    , document.getElementById('root'));

registerServiceWorker();
