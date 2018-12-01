import ApolloClient from 'apollo-boost';
import clientState from './clientState';

const client = new ApolloClient({
    uri: (process.env.NODE_ENV === "production") ? process.env.REACT_APP_GRAPHQL_URI_PRODUCTION : process.env.REACT_APP_GRAPHQL_URI_LOCAL,
    clientState,
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(`💢[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`) //eslint-disable-line
            )
        if (networkError) console.log(`💢[Network error]: ${networkError}`); //eslint-disable-line
    }
})

export { client }