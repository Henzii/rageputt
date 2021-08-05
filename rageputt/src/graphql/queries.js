import { gql } from '@apollo/client';
import { USER_FULL_INFO, GAME_DETAILS } from './fragments';

export const GET_ME = gql`
    query getMe {
        getMe{
           ...UserFullInfo
        }
    } ${USER_FULL_INFO}
`
export const GET_GAMES = gql`
    query getGames {
        getGames {
           ...GameDetails
        }
    } ${GAME_DETAILS}
`
export const GET_USER_GAMES = gql`
    query getGames( $userId: ID ) {
        getGames( userId: $userId ) {
            ...GameDetails
        }
    } ${GAME_DETAILS}
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
export const IS_USERNAME_AVAILABLE = gql`
    query isUsernameAvailable( $user: String! ) {
        isUsernameAvailable( user: $user)
    }
`