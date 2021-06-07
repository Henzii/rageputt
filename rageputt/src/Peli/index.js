import { useMutation, useLazyQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Grid, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_GAME, GET_ROUND } from '../queries'
import Player from './Player'
import NewGameModal from './NewGameModal'
import { Redirect } from 'react-router'

const Peli = () => {

    const dispatch = useDispatch()
    const [modalOpen, setModal] = useState(false)

    const tulokset = useSelector(state => state.tulokset)
    const user = useSelector(state => state.user)

    const [haeRundi, kierrosData] = useLazyQuery(GET_ROUND)
    const [uusiPeli] = useMutation(CREATE_GAME)

    const handleNewGame = async (e) => {
        e.preventDefault()
        const res = await uusiPeli()
        dispatch({ type: 'SET_ID', data: { roundId: res.data.createGame } })
        setModal(false);
    }
    console.log(tulokset)
    console.log(kierrosData)
    if (!user.user) {
        return (
            <Redirect to="/login" />
        )
    }
    if (kierrosData.loading) {
        return (
            <div>
                <h2>Loading round...</h2>
            </div>
        )
    }
    if (!kierrosData.called && tulokset.roundId)
        haeRundi({ variables: { roundId: tulokset.roundId }});
    if (tulokset.roundId === null || !kierrosData.data) {
        return (
            <div>
                <h2>Pakko päästä puttaa</h2>
                <p>
                    Ei aktiivista peliä käynnissä. Aloita joko uusi peli tai jatkaa vanhaa peliä.
                </p>
                <p>
                    Vanhan pelin jatkaminen onnistuu aktivoimalla se 'Vanhat peli' -osiosta.
                </p>
                <Button onClick={() => setModal(true)} color="primary" variant="contained" size="large" fullWidth>Aloita uusi peli</Button>

                <NewGameModal open={modalOpen} setModal={setModal} handleNewGame={handleNewGame} />

            </div>
        )
    }
    const kierros = tulokset.round

    return (
        <div>

            <Grid container className="rundiValitsin">
                <Grid item ><IconButton onClick={() => dispatch({ type: 'DEC_ROUND' })}><ChevronLeft /></IconButton></Grid>
                <Grid item component={'h2'}>Round {kierros + 1}</Grid>
                <Grid item><IconButton onClick={() => dispatch({ type: 'INC_ROUND' })}><ChevronRight /></IconButton></Grid>
            </Grid>
            {kierrosData.data.getRound.players.map(p => <Player key={p.user.name} player={p} round={kierros} />)}
        </div>
    )

}

export default Peli;