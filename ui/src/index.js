import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Home from 'views/Home';
import Recipe from 'views/Recipe';
import RecipeAdd from 'views/RecipeAdd';
import Auth from './auth';
import history from './history';
import Callback from 'components/Callback/Callback';
import { Router, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import './style/index.css';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router component={Home} history={history}>
            <Fragment>
                <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/recipe/:recipe" render={(props) => <Recipe auth={auth} {...props} />} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }} />
                <PrivateRoute path="/add" />
            </Fragment>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

function PrivateRoute({ ...rest}) {
    return (
        <Route {...rest} render={(props => auth.isAuthenticated() ? (
            <RecipeAdd auth={auth} {...props} />
            ) : (
            <Redirect to={{ pathname: "/failed"}} />
            ))}
        />
    )
}
registerServiceWorker();