import { useApolloClient, useLazyQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ROUND } from "../graphql/queries";
import { CARD_CHANGED } from "../graphql/subscriptions";
import { apolloCacheUpdate } from "../utils/apolloCacheUpdate";

const useGetRound = (roundId) => {

    const [roundData, setRoundData ] = useState(null) 
    const [getRaakaData, raakaData ] = useLazyQuery(GET_ROUND)
    const client = useApolloClient()

    const pushed = useSubscription ( CARD_CHANGED, { variables: { roundId } })
    useEffect( () => {
        if (roundId === null) return null
        if (!raakaData.loading) {
            if (!raakaData.called || raakaData.variables.roundId !== roundId) {
                getRaakaData( { variables: { roundId }})
            }
            else {
                setRoundData( raakaData )
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundId, raakaData])
    useEffect( () => {
        if (!pushed.loading)
            refreshCache(pushed.data.changedCard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pushed])

    const refreshCache = (newData) => {
        apolloCacheUpdate(client, GET_ROUND, newData, 'getRound', { roundId })
    }

    return roundData
}
export default useGetRound;