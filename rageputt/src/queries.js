import { gql } from '@apollo/client'

export const CARD_CHANGED = gql`
    subscription changedCard( $roundId: String!) {
        changedCard( roundId: $roundId) {
            data {
                tulokset
                user { user name }
            }
        }
    }
`
export const LOGIN = gql`
    mutation login($user: String!, $password: String!) {
        login(
            user: $user
            password: $password
        ) {
            value
            user { user name }
        }
    }


`
export const END_GAME = gql`
    mutation endGame ($id: String!) {
        finishGame(
            roundId: $id
        )
    }
`
export const GET_ME = gql`
    query getMe {
        getMe{
           name
           user
           friends { user name id }
           friendRequests { user name id }
        }
    }
`
export const CREATE_GAME = gql`
    mutation createGame ($pelaajat: [String]) {
        createGame(
            pelaajat: $pelaajat
        )
    }
`
export const GET_GAMES = gql`
    query getGames {
        getGames {
            finished
            timestamp
            id
            players{ tulokset user{user name}}
        }
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
            timestamp
            players {
                user { user }
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
            id
            players {
                user { user name }
                tulokset
            }
        }
    }
`
export const ANSWER_FRIEND_REQUEST = gql`
    mutation handleFriendRequest($friendId: String!, $answer: Boolean!) {
        handleFriendRequest(
            friendId: $friendId
            action: $answer
        )
    }
`
export const SEND_FRIEND_REQUEST = gql`
    mutation sendFriendRequest($name: String!) {
        sendFriendRequest(
            fName: $name
        )
    }
`