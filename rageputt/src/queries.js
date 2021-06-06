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
export const CREATE_GAME = gql`
    mutation createGame {
        createGame
    }
`
export const GET_GAMES = gql`
    query getGames {
        getGames
    }
`
export const SET_SCORE = gql`
    mutation setScore($roundId: String!, $round: ID!, $player: String!, $score: Int!) {
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
            timestamp
            players {
                user { name }
                tulokset
            }
        }
    }
`
