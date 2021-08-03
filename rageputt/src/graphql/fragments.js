import { gql } from "@apollo/client";

export const USER_FULL_INFO = gql`
    fragment UserFullInfo on User {
        name
        user
        email
        shareStats
        friends { user name id }
        friendRequests { user name id }
    }
`
