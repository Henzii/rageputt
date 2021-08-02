import { useMutation, useLazyQuery } from '@apollo/client'
import { Button, Divider, CircularProgress, Typography } from '@material-ui/core'
import { Tabs, Tab, Backdrop } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tulosruutu from './Tulosruutu'
import NewGameModal from './NewGameModal'
import PlayerStats from './PlayerStats'
import { Redirect } from 'react-router'

import TabPanel from '../../components/TabPanel'

import { GET_ROUND, GET_GAMES } from '../../graphql/queries'
import { CREATE_GAME, DELETE_GAME, END_GAME } from '../../graphql/mutations'

import { Container } from '@material-ui/core'
import { setNotification } from '../../reducers/notificationReducer'

const Peli = () => {

    const dispatch = useDispatch()
    const [modalOpen, setModal] = useState(false)
    const [tabValue, setTabValue] = useState(0)

    const tulokset = useSelector(state => state.tulokset)
    const user = useSelector(state => state.user)

    const [haeRundi, kierrosData] = useLazyQuery(GET_ROUND)

    const [uusiPeli] = useMutation(CREATE_GAME)
    const [paataPeli] = useMutation(END_GAME)
    const [poistaPeli] = useMutation(DELETE_GAME)
    
    useEffect( () => {
        if (tulokset.roundId && kierrosData.roundId !== tulokset.roundId) {
            try {
                haeRundi({ variables: { roundId: tulokset.roundId } });
            } catch (e) {
                console.log('Virhe peliä hakiessa', e.message)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tulokset.roundId])
    const handleNewGame = async (pelaajat) => {
        try {
            const res = await uusiPeli({ variables: { pelaajat: pelaajat }, refetchQueries: [{ query: GET_GAMES } ] })
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
    if (kierrosData.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>

        )
    } 
    if (tulokset.roundId === null || !kierrosData.data) {
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
                    <Tulosruutu kierrosData={kierrosData} tulokset={tulokset} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>

                    <Typography variant="h5" gutterBottom>Poistu pelistä</Typography>
                    <Typography paragraph>
                        Poistu päävalikkoon. Peli on tallennettu ja tulosten merkkaamista voi jatkaa.
                    </Typography>
                    <Button size="large" onClick={() => dispatch({ type: 'RESET_ROUND' })} variant="contained" color="primary" fullWidth>Poistu pelistä</Button>

                    <Divider style={{ margin: '15px 0px' }} />

                    <Typography variant="h5" gutterBottom>Päätä peli</Typography>
                    <Typography paragraph>Peli päätetään. Tulosten kirjaaminen suljetaan. Tulokset lasketaan mukaan statistiikkoihin.</Typography>
                    <Button onClick={handleEndGame} size="large" variant="contained" color="primary" fullWidth>Päätä peli</Button>

                    <Divider style={{ margin: '15px 0px' }} />

                    <Typography variant="h5" gutterBottom>Poista peli</Typography>
                    <Typography paragraph>Peli poistetaan</Typography>
                    <Button size="large" onClick={handleDeleteGame} variant="contained" color="primary" fullWidth>Poista peli</Button>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    {kierrosData.data.getRound.players.map(p => <PlayerStats player={p} key={'ps' + p.user.user} />)}
                </TabPanel>
            </Container>
        </>
    )

}

export default Peli;