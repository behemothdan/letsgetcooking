import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation User(
        $name: String!,
        $picture: String,
        $id: String,
        $given_name: String,
        $email: String
    ) {
        CreateUser(name: $name) {
            name,
            picture,
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