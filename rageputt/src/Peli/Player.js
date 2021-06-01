import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import { useDispatch } from "react-redux"

const Player = ({ player, round }) => {

    const dispatch = useDispatch()

    const handleChange = (e) => {    
        console.log('Clickkiä arvoon ', e.target.value)
        dispatch({
            type: 'SET_SCORE',
            data: {
                name: player.name,
                round: round,
                score: Number(e.target.value)
            }
        })
    }

    return (
        <div>
            <h2>{player.name} { (round > 1) ? 5+player.tulokset[round-1] : 10}m</h2>
            <div className="tulosValitsin">
                <RadioGroup row style={{ whiteSpace: 'nowrap' }} value={player.tulokset[round]} onChange={handleChange}>
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