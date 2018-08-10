import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import './style/Index.css';
import Home from "./views/Home";

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route path="/" component={Home} />
            </div>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();