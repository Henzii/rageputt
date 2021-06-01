import { Grid, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import Player from './Player'

const Peli = () => {

    const dispatch = useDispatch()
    const rundiData = useSelector(state => state.tulokset)
    return (
        <div>
            <Grid container className="rundiValitsin">
                <Grid item ><IconButton onClick={() => dispatch({ type: 'DEC_ROUND'})}><ChevronLeft /></IconButton></Grid>
                <Grid item component={'h2'}>Round {rundiData.round}</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND'} )}><ChevronRight /></IconButton></Grid>
            </Grid>
            {rundiData.players.map(p => <Player key={p.name} player={p} round={rundiData.round} />)}
        </div>
    )
        
}

export default Peli;