import { gql } from '@apollo/client';
import { USER_FULL_INFO } from './fragments';

export const RESTORE_ACCOUNT = gql`
    mutation restoreAccount( $email: String!) {
        restoreAccount( email: $email )
    }
`
export const DELETE_ACCOUNT = gql`
    mutation deleteAccount {
        deleteAccount
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
    mutation changeSettings($name: String, $password: String, $email: String, $shareStats: Boolean, $ignoreFriendRequests: Boolean) {
        changeSettings(
            name: $name,
            password: $password,
            email: $email,
            shareStats: $shareStats,
            ignoreFriendRequests: $ignoreFriendRequests
        ) {
            name
            user
            email
            shareStats
            ignoreFriendRequests
            friends { user name id }
            friendRequests { user name id }
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
export const DELETE_GAME = gql`
    mutation deleteGame ( $roundId: String!) {
        deleteGame(
            roundId: $roundId
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
                user { user name }
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
            value
            user { user name }
        }
    }
`
export const ANSWER_FRIEND_REQUEST = gql`
    mutation handleFriendRequest($friendId: String!, $answer: Boolean!) {
        handleFriendRequest(
            friendId: $friendId
            action: $answer
        ) {
            ...UserFullInfo
        }
    }${USER_FULL_INFO}
`
export const SEND_FRIEND_REQUEST = gql`
    mutation sendFriendRequest($name: String!) {
        sendFriendRequest(
            fName: $name
        )
    }
`
export const DELETE_FRIEND = gql`
    mutation deleteFriend( $userId: ID! ) {
        deleteFriend( userId: $userId ) {
            ...userFullInfo
        }
    }${USER_FULL_INFO}
`