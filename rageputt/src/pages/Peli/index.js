import { useMutation, useLazyQuery } from '@apollo/client'
import { Button, AppBar, Divider, CircularProgress } from '@material-ui/core'
import { Tabs, Tab, Backdrop } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_GAME, GET_ROUND, END_GAME } from '../../queries'
import Tulosruutu from './Tulosruutu'
import NewGameModal from './NewGameModal'
import PlayerStats from './PlayerStats'
import { Redirect } from 'react-router'
import TabPanel from './TabPanel'

const Peli = () => {

    const dispatch = useDispatch()
    const [modalOpen, setModal] = useState(false)
    const [tabValue, setTabValue] = useState(0)

    const tulokset = useSelector(state => state.tulokset)
    const user = useSelector(state => state.user)

    const [haeRundi, kierrosData] = useLazyQuery(GET_ROUND)

    const [uusiPeli] = useMutation(CREATE_GAME)
    const [paataPeli] = useMutation(END_GAME)

    const handleNewGame = async (pelaajat) => {

        const res = await uusiPeli({ variables: { pelaajat: pelaajat } })

        dispatch({ type: 'SET_ID', data: { roundId: res.data.createGame } })
        setModal(false);
    }
    const handleEndGame = async () => {

        try {
            await paataPeli( { variables: { id: tulokset.roundId }})
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
    if (!kierrosData.called && tulokset.roundId)
        haeRundi({ variables: { roundId: tulokset.roundId } });
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
            <TabPanel value={tabValue} index={0}>
                <Tulosruutu kierrosData={kierrosData} tulokset={tulokset}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <h2>Mitä tehdään?</h2>
                <h3>Poistu pelistä</h3>
                <p>
                    Poistu päävalikkoon. Peli on tallennettu ja tulosten merkkaamista voi jatkaa.
                </p>
                <Button size="large" onClick={() => dispatch({ type: 'RESET_ROUND' })} variant="contained" color="primary" fullWidth>Poistu pelistä</Button>
                <Divider  style={{ marginTop: '15px'}}/>
                <h3>Päätä peli</h3>
                <p>
                    Peli päätetään. Tulosten kirjaaminen suljetaan.
                </p>
                <Button onClick={handleEndGame} size="large" variant="contained" color="primary" fullWidth>Päätä peli</Button>
                <Divider  style={{ marginTop: '15px'}}/>
                <h3>Hylkää peli</h3>
                <p>
                    Kaikki tuhotaan.
                </p>
                <Button size="large" variant="contained" color="primary" fullWidth>Tuhoa maailma</Button>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                {kierrosData.data.getRound.players.map(p => <PlayerStats player={p} key={'ps'+p.user.id} />)}
            </TabPanel>
        </>
    )

}

export default Peli;