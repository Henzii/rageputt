import { gql } from '@apollo/client';

export const RESTORE_ACCOUNT = gql`
    mutation restoreAccount( $email: String) {
        restoreAccount( email: $email )
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
export const CHANGE_SETTINGS = gql`
    mutation changeSettings($name: String, $password: String, $email: String) {
        changeSettings(
            name: $name,
            password: $password,
            email: $email
        ) {
            name
            email
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
export const CREATE_GAME = gql`
    mutation createGame ($pelaajat: [String]) {
        createGame(
            pelaajat: $pelaajat
        )
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