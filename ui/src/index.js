import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const initialSate = {
    recipesInCache: {
        name: "Test Recipe",
        time: "Forever"
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    clientState: {        
        defaults: initialSate
    }
})

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
