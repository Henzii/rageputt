import { Grid, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import Player from './Player'

import { useSubscription, useApolloClient } from '@apollo/client'

import { GET_ROUND } from '../../graphql/queries'
import { CARD_CHANGED } from '../../graphql/subscriptions'

import { useEffect } from 'react'

const Tulosruutu = ({ kierrosData, tulokset }) => {

    const dispatch = useDispatch()
    const kierros = tulokset.round

    const client = useApolloClient()
    const pushed = useSubscription(CARD_CHANGED, { variables: { roundId: kierrosData.data.getRound.id } })

    useEffect(() => {
        if (!pushed.loading) {
            const dataMuistissa = client.readQuery({ query: GET_ROUND, variables: { roundId: kierrosData.data.getRound.id } })

            if (dataMuistissa !== null) {

                client.writeQuery({
                    query: GET_ROUND,
                    variables: { roundId: kierrosData.data.getRound.id },
                    data: {
                        getRound: {
                            ...dataMuistissa.getRound,
                            players: dataMuistissa.getRound.players.map(p =>
                                (p.user.user === pushed.data.changedCard.data.user.user)
                                    ? pushed.data.changedCard.data
                                    : p
                            )
                        }
                    }
                })

            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pushed])

    return (
        <div>
            <Grid container className="rundiValitsin">
                <Grid item><IconButton size="large" onClick={() => dispatch({ type: 'DEC_ROUND' })}><ChevronLeft /></IconButton></Grid>
                <Grid item component={'h2'}> {kierros + 1}/20</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND' })}><ChevronRight /></IconButton></Grid>
            </Grid>
            {kierrosData.data.getRound.players.map(p => <Player key={p.user.user + 'ppp'} player={p} round={kierros} />)}
        </div>
    )
}

export default Tulosruutu