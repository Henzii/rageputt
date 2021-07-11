import { gql } from '@apollo/client';

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