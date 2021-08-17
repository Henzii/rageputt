import { Grid, IconButton } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import Player from './Player'

const PeliRuutu = ({ kierrosData, tulokset }) => {

    const dispatch = useDispatch()
    const kierros = tulokset.round

    return (
        <div>
            <Grid container className="rundiValitsin">
                <Grid item><IconButton onClick={() => dispatch({ type: 'DEC_ROUND' })}><ArrowBackIos /></IconButton></Grid>
                <Grid item component={'h2'}> {kierros + 1}/20</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND' })}><ArrowForwardIos /></IconButton></Grid>
            </Grid>
            {kierrosData.data.getRound.players.map(p => <Player key={p.user.user + 'ppp'} player={p} round={kierros} />)}
        </div>
    )
}

export default PeliRuutu