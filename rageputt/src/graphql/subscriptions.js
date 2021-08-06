import { gql } from '@apollo/client';

export const CARD_CHANGED = gql`
subscription changedCard( $roundId: String) {
    changedCard( roundId: $roundId ) {
        id
        finished
        timestamp
        players {
            user { user name id }
            tulokset
        }
    }
}
`