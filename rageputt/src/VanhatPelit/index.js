import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { GET_GAMES } from "../queries"
import { Backdrop, CircularProgress } from '@material-ui/core'
import Pelikortti from "./Pelikortti"

const VanhatPelit = () => {

    const getGames = useQuery(GET_GAMES)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const aktivoi = (g) => {
        dispatch({ type: 'SET_ID', data: { roundId: g }})
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
            <h2>Vanhat pelit</h2>
            {getGames.data.getGames.map(g => <Pelikortti user={user.user} aktivoi={aktivoi} peli={g} key={g.id} />)}
        </div>
    )
}
export default VanhatPelit