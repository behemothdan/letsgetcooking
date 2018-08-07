import ApolloClient from 'apollo-boost';

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

export {client}