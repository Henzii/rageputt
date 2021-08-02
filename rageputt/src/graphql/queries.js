import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe {
        getMe{
           name
           user
           email
           shareStats
           friends { user name id }
           friendRequests { user name id }
        }
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