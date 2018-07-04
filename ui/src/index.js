import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `💢[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
        if (networkError) console.log(`💢[Network error]: ${networkError}`);
      }
})

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();