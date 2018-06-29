import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const initialState = {
    recipesBySubstring: {
        // Eventually fill this with a complete recipe?
        __typename: "Recipe",
        name: "Test Recipe",
        time: "Forever"
    },
    searchQueryInCache: ""
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    clientState: {
        defaults: initialState
    }
})

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
