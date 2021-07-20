import { useMutation, useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { GET_GAMES } from "../../graphql/queries"
import { DELETE_GAME } from '../../graphql/mutations'
import { Backdrop, CircularProgress, Container, Typography } from '@material-ui/core'
import Pelikortti from "./Pelikortti"

import { setNotification } from '../../reducers/notificationReducer'
import { useState } from "react"
import YesNoModal from "../../components/YesNoModal"

const VanhatPelit = () => {

    const getGames = useQuery(GET_GAMES)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [poistaPeliId, setPoistaPeliId] = useState(null)
    const [poistaPeli] = useMutation(DELETE_GAME)

    const aktivoi = (g) => {
        dispatch({ type: 'SET_ID', data: { roundId: g } })
        dispatch(setNotification('Peli akitoivu, valitse \'Uusi peli\'', 'info'))
    }
    const handlePoistaPeli = async () => {
        console.log('Poistetaan', poistaPeliId)
        try {
            poistaPeli({ variables: { roundId: poistaPeliId }, refetchQueries: [{ query: GET_GAMES }] })
            dispatch( setNotification('Peli poistettu', 'success'))
        } catch (e) {
            dispatch( setNotification('Virhe pelin poistamisessa', 'error'))
            console.log(e.message)
        }
    }
    if (!user.user) {
        return (
            <Redirect to="/login" />
        )
    }

    if (getGames.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }
    console.log(getGames)
    return (
        <div>
            <Container>
                <Typography variant="h5" gutterBottom>Vanhat peli</Typography>
                {getGames.data.getGames.map(g =>
                    <Pelikortti user={user.user}
                        aktivoi={aktivoi} poista={(roundId) => setPoistaPeliId(roundId)}
                        peli={g} key={g.id}
                    />)}
            </Container>
            <YesNoModal open={(poistaPeliId)}
                title="Oletko vamra?"
                text="Haluatko varmasti poistaa pelin?"
                close={() => setPoistaPeliId(false)}
                onYesClick={handlePoistaPeli}
            />

        </div>
    )
}
export default VanhatPelit