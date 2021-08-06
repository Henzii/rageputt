import { useLazyQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ROUND } from "../graphql/queries";
import { CARD_CHANGED } from "../graphql/subscriptions";

const useGetRound = (roundId) => {

    const [roundData, setRoundData ] = useState(null) 
    const [getRaakaData, raakaData ] = useLazyQuery(GET_ROUND)

    const pushed = useSubscription ( CARD_CHANGED, { variables: { roundId } })

    useEffect( () => {
        if (roundId === null) return null
        if (!raakaData.loading) {
            if (!raakaData.called || raakaData.variables.roundId !== roundId) getRaakaData( { variables: { roundId }})
            else {
                setRoundData( raakaData )
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundId, raakaData])
    useEffect( () => {
        console.log('SUB: ', pushed)
    }, [pushed])

    return roundData
}
export default useGetRound;