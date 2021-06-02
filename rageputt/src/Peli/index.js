import { useQuery } from '@apollo/client'
import { Grid, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ROUND } from '../queries'
import Player from './Player'

const Peli = () => {

    const dispatch = useDispatch()

    const rundiData = useSelector(state => state.tulokset)

    const vastaus = useQuery( GET_ROUND, { variables: { roundId: 'tR1' }})
    
    useEffect(() => {
        if (!vastaus.loading) dispatch({ type: 'INIT_ROUND', data: {...vastaus.data.getRound, round: 1 }} )
    }, [vastaus])

    if (vastaus.loading || ! rundiData) {
        return (
            <div>
                <h2>Loading round...</h2>
            </div>
        )
    } 
    console.log('Vastaus: ', vastaus);
    console.log('rundiData: ', rundiData);
    return (
        <div>
            <Grid container className="rundiValitsin">
                <Grid item ><IconButton onClick={() => dispatch({ type: 'DEC_ROUND'})}><ChevronLeft /></IconButton></Grid>
                <Grid item component={'h2'}>Round {rundiData.round}</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND'} )}><ChevronRight /></IconButton></Grid>
            </Grid>
            {rundiData.players.map(p => <Player key={p.user.name} player={p} round={rundiData.round} />)}
        </div>
    )
        
}

export default Peli;