import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { GET_USER_GAMES } from "../graphql/queries"
import { setNotification } from "../reducers/notificationReducer"

const useGetGames = (id = null) => {

    const [userId, setUserId] = useState(id)
    const dispatch = useDispatch();
    const query = useQuery(GET_USER_GAMES, { variables: { userId } })
    const [games, setGames] = useState(null)

    useEffect(() => {
        if (!query.loading) {
            if (query.error) {
                dispatch( setNotification('Käyttäjä on estänyt jakamisen', 'error'))
            }
            else { 
                setGames(query.data.getGames)
            }
        }
    }, [query])
    return { games, setUserId, userId };
}
export default useGetGames;