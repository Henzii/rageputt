import { gql } from "@apollo/client";

export const USER_FULL_INFO = gql`
    fragment UserFullInfo on User {
        name
        user
        email
        shareStats
        ignoreFriendRequests
        friends { user name id }
        friendRequests { user name id }
        id
    }
`
export const GAME_DETAILS = gql`
    fragment GameDetails on Game {
        finished
        timestamp
        players { user { user name id } tulokset }
        id
    }
`;