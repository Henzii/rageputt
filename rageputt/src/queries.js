import { gql } from '@apollo/client'
export const LOGIN = gql`
    mutation login($user: String!, $password: String!) {
        login(
            user: $user
            password: $password
        ) {
            value
        }
    }


`
export const CREATE_USER = gql`
    mutation createUser($user: String!, $password: String!, $name: String, $email: String) {
        createUser(
            user: $user
            password: $password
            name: $name
            email: $email
        ) {
            user
        }
    }
`