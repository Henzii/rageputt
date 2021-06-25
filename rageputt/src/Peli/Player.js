import { useMutation } from "@apollo/client"
import { CircularProgress, FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { SET_SCORE, GET_ROUND } from "../queries"
import { setNotification } from "../reducers/notificationReducer"

import { laskePisteet } from '../utils/stuff'

const Player = ({ player, round }) => {

    const roundData = useSelector(state => state.tulokset)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(null)

    const [setScore] = useMutation(SET_SCORE, { variables: { roundId: roundData.roundId } })

    const handleChange = (e) => {
        console.log('Clickkiä arvoon ', e.target.value)
        setLoading(e.target.value)
        setScore({
            variables: {
                roundId: roundData.roundId,
                round: roundData.round,
                player: player.user.user,
                score: Number(e.target.value)
            }
        }).catch(e => {
            dispatch(setNotification(e.message, 'error'))
        }).finally(() => {
            setLoading(null)
            if (round > 0 && !player.tulokset[round-1] )
                dispatch( setNotification('Kierroksen ' + round + ' tulos puuttuu', 'warning'))
        })
    }
    const distance = (round > 0) ? 5 + player.tulokset[round - 1] : 10
    const pisteet = laskePisteet(player.tulokset)
    let putteja = player.tulokset[round]
    if (isNaN(putteja)) putteja = null
    return (
        <div>
            <h2>{player.user.name} {(distance) ? distance : ' xx '}m - {pisteet}</h2>
            <div className="tulosValitsin">
                <RadioGroup row style={{ whiteSpace: 'nowrap' }} value={putteja} onChange={handleChange}>
                    <RadioButtons loading={loading} />
                </RadioGroup>
            </div>
        </div>
    )
}
const RadioButtons = ({ loading }) => {
    const palautus = []
    var i
    for (i = 0; i < 6; i++) {
        if (loading && i === Number(loading)) {
            palautus.push(<CircularProgress />)
        }
        else {
            palautus.push(
                <FormControlLabel
                    labelPlacement="top"
                    key={i}
                    value={i}
                    label={i}
                    control={
                        <Radio color="primary" size="small"
                            style={{ padding: '0px' }}
                        />}
                />)
        }
    }
    return palautus;
}

export default Player