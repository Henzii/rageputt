import { useQuery, useLazyQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Grid, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ROUND } from '../queries'
import Player from './Player'
import NewGameModal from './NewGameModal'

const Peli = () => {

    const dispatch = useDispatch()
    const [ modalOpen, setModal ] = useState(false)

    const tulokset = useSelector(state => state.tulokset)
    
    const kierrosData = useQuery(GET_ROUND, { variables: { roundId: tulokset.roundId } } )

    const handleNewGame = () => {

    }

    if (kierrosData.loading) {
        return (
            <div>
                <h2>Loading round...</h2>
            </div>
        )
    }
    if (tulokset.roundId === null || kierrosData.data.getRound === null) {
        return (
            <div>
                <h2>Pakko puttaa</h2>
                <p>
                    Ei aktiivista peliä käynnissä.
                </p>
                <Button onClick={ () => setModal(true) } color="primary" variant="contained" size="large" fullWidth>Aloita uusi peli</Button>

                <NewGameModal open={modalOpen} setModal={setModal}/>

            </div>            
        )
    }

    const kierros = tulokset.round
    
    return (
        <div>
            <Grid container className="rundiValitsin">
                <Grid item ><IconButton onClick={() => dispatch({ type: 'DEC_ROUND' })}><ChevronLeft /></IconButton></Grid>
                <Grid item component={'h2'}>Round {kierros+1}</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND' })}><ChevronRight /></IconButton></Grid>
            </Grid>
            {kierrosData.data.getRound.players.map(p => <Player key={p.user.name} player={p} round={kierros} />)}
        </div>
    )

}

export default Peli;