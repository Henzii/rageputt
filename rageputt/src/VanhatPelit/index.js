import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { GET_GAMES } from "../queries"

const VanhatPelit = () => {

    const getGames = useQuery(GET_GAMES)
    const user = useSelector(state => state.user)

    if (!user.user) {
        return (
            <Redirect to="/login" />
        )
    }

    if (getGames.loading) {
        return (
            <h2>Loading rounds...</h2>
        )
    }
    console.log(getGames)
    return (
        <div>
            <h2>Vanhat pelit</h2>
            {getGames.data.getGames}
        </div>
    )
}
export default VanhatPelit