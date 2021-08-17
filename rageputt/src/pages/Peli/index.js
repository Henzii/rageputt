import { useMutation } from '@apollo/client'
import { Button, Paper, Typography } from '@material-ui/core'
import { Tabs, Tab } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Peliruutu from './PeliRuutu'
import NewGameModal from './NewGameModal'
import PlayerStats from './PeliStats'
import { Redirect } from 'react-router'

import TabPanel from '../../components/TabPanel'

import { GET_GAMES } from '../../graphql/queries'
import { CREATE_GAME, DELETE_GAME, END_GAME } from '../../graphql/mutations'

import { Container } from '@material-ui/core'
import { setNotification } from '../../reducers/notificationReducer'
import useGetRound from '../../hooks/useGetRound'
import PeliAsetukset from './PeliAsetukset'

const Peli = () => {

    const dispatch = useDispatch()
    const [modalOpen, setModal] = useState(false)
    const [tabValue, setTabValue] = useState(0)

    const tulokset = useSelector(state => state.tulokset)
    const user = useSelector(state => state.user)

    const [uusiPeli] = useMutation(CREATE_GAME)
    const [paataPeli] = useMutation(END_GAME)
    const [poistaPeli] = useMutation(DELETE_GAME)

    const kierrosData = useGetRound(tulokset.roundId)

    const handleNewGame = async (pelaajat) => {
        try {
            const res = await uusiPeli({ variables: { pelaajat: pelaajat }, refetchQueries: [{ query: GET_GAMES }] })
            dispatch({ type: 'SET_ID', data: { roundId: res.data.createGame } })
            dispatch(setNotification('Uusi peli luotu', 'info'))
        } catch (e) {
            dispatch(setNotification('Virhe uuden pelin luonnissa', 'error'))
            console.log(e.message)
        }
        setModal(false);
    }
    const handleDeleteGame = async () => {
        try {
            await poistaPeli({ variables: { roundId: tulokset.roundId }, refetchQueries: [{ query: GET_GAMES }] })
            dispatch({ type: 'RESET_ROUND' })
            dispatch(setNotification('Peli poistettu', 'success'))
        } catch (e) {
            dispatch(setNotification(`Virhe pelin poistamisessa`, 'error'))
            console.log(e.message)
        }
    }
    const handleEndGame = async () => {

        try {
            await paataPeli({ variables: { id: tulokset.roundId }, refetchQueries: [{ query: GET_GAMES }] })
            dispatch(setNotification('Peli päätetty', 'warning'))
        } catch (e) {
            console.log('Virhe pelin päättämisessä. ' + e.message)
        }
        return (
            <Redirect to="/pelit" />
        )

    }
    if (!user.user) {
        return (
            <Redirect to="/login" />
        )
    }

    if (tulokset.roundId === null || kierrosData === null) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Pakko päästä puttaa</Typography>
                <Typography paragraph>
                    Ei aktiivista peliä käynnissä. Aloita joko uusi peli tai jatkaa vanhaa peliä.
                </Typography>
                <Typography paragraph>
                    Vanhan pelin jatkaminen onnistuu aktivoimalla se 'Vanhat peli' -osiosta.
                </Typography>
                <Button onClick={() => setModal(true)} color="primary" variant="contained" size="large" fullWidth>Aloita uusi peli</Button>

                <NewGameModal open={modalOpen} setModal={setModal} handleNewGame={handleNewGame} />

            </Container>
        )
    }
    console.log(user.user)
    return (
        <>
            <Tabs
                value={tabValue}
                onChange={(event, uusi) => setTabValue(uusi)}
                variant="fullWidth"
            >
                <Tab label="Peli" />
                <Tab label="Asetukset" />
                <Tab label="Statsit" />
            </Tabs>

            <Container>
                <TabPanel value={tabValue} index={0}>
                    <Peliruutu kierrosData={kierrosData} tulokset={tulokset} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <PeliAsetukset handleDeleteGame={handleDeleteGame} handleEndGame={handleEndGame} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    {kierrosData.data.getRound.players.map(p => 
                        <Paper key={user.user+'abc123'}>
                        <PlayerStats player={p} />
                        </Paper>
                    )}
                </TabPanel>
            </Container>
        </>
    )

}

export default Peli;