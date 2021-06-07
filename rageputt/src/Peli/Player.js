import { useMutation } from "@apollo/client"
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import { useSelector } from 'react-redux'
import { SET_SCORE, GET_ROUND } from "../queries"

import { laskePisteet } from '../utils/stuff'

const Player = ({ player, round }) => {

    const roundData = useSelector(state => state.tulokset)

    const [setScore] = useMutation(SET_SCORE, {
        refetchQueries: [{ query: GET_ROUND, variables: { roundId: roundData.roundId } }]
    })


    const handleChange = (e) => {
        console.log('Clickkiä arvoon ', e.target.value)
        setScore({
            variables: {
                roundId: roundData.roundId,
                round: roundData.round,
                player: player.user.user,
                score: Number(e.target.value)
            }
        })
    }
    const distance = (round > 0 ) ? 5 + player.tulokset[ round-1 ] : 10
    const pisteet = laskePisteet(player.tulokset)
    let putteja = player.tulokset[round]
    if (isNaN(putteja)) putteja = null
    console.log(putteja)
    return (
        <div>
            <h2>{player.user.name} { (distance) ? distance : ' xx '}m - {pisteet}</h2>
            <div className="tulosValitsin">
                <RadioGroup row style={{ whiteSpace: 'nowrap' }} value={putteja} onChange={handleChange}>
                    <RadioButtons />
                </RadioGroup>
            </div>
        </div>
    )
}
const RadioButtons = () => {
    const palautus = []
    var i
    for (i = 0; i < 6; i++) {
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
    return palautus;
}

export default Player