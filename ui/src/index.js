import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './style/Index.css';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`💢[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`) //eslint-disable-line
        )
        if (networkError) console.log(`💢[Network error]: ${networkError}`); //eslint-disable-line
      }
})

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();