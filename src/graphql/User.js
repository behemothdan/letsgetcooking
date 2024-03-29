import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation User(
        $name: String!,
        $id: String,
        $given_name: String,
        $email: String
    ) {
        CreateUser(name: $name, id: $id, given_name: $given_name, email: $email) {
            name,
            id,
            given_name,
            email
        }
    }
`;

export const FIND_USER = gql`
    query($id: String = "null")
    {
        UserById(id: $id) {
            id
        }
    }
`;