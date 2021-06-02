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
export const SET_SCORE = gql`
    muation setScore($roundId: String!, $round: Int!, $player: String!, $score: Int!) {
        setScore(
            roundId: $roundId
            round: $round
            player: $player
            score: $score
        ) {
            finished
            timeStamp
            players {
                user { name}
                tulokset
            }
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
export const GET_ROUND = gql`
    query getRound($roundId: String!) {
        getRound(
            roundId: $roundId
        ) {
            finished
            timeStamp
            players {
                user { name }
                tulokset
            }
        }
    }
`
