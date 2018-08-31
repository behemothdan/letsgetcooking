import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import registerServiceWorker from './registerServiceWorker';
import './style/Index.css';
import Home from "./views/Home";
import Auth from './auth';
import Callback from './components/Callback/Callback';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }} />
            </div>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();