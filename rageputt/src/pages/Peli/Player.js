import { useMutation } from "@apollo/client"
import { CircularProgress, FormControlLabel, Radio, RadioGroup, Grid } from "@material-ui/core"
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { SET_SCORE } from "../../graphql/mutations"

import { setNotification } from "../../reducers/notificationReducer"

import { laskePisteet } from '../../utils/stuff'

const Player = ({ player, round }) => {

    const roundData = useSelector(state => state.tulokset)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(null)

    const [setScore] = useMutation(SET_SCORE, { variables: { roundId: roundData.roundId } })
    console.log(player)
    const handleChange = (e) => {
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
            if (round > 0 && isNaN(player.tulokset[round - 1]))
                dispatch(setNotification('Kierroksen ' + round + ' tulos puuttuu', 'warning'))
        })
    }
    const distance = (round > 0) ? 5 + player.tulokset[round - 1] : 10
    const pisteet = laskePisteet(player.tulokset)
    let putteja = player.tulokset[round]
    if (isNaN(putteja)) putteja = null
    return (
        <Card className="tulos-kortti" elevation={3}>
            <CardHeader
                title={player.user.name}
                action={distance + 'm'}
                subheader={pisteet + ' points'}
                titleTypographyProps={{ style: { margin: 0}} }
                //subheaderTypographyProps={{ style: { margin: 0 }}}
            />
            <CardContent style={{padding: '15px 0px'}}>
                <RadioGroup row value={putteja} onChange={handleChange}>
                    <Grid container alignContent='space-between'>
                        <RadioButtons loading={loading} user={player.user.user} />
                    </Grid>
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
const RadioButtons = ({ loading, user }) => {
    const palautus = []
    var i
    for (i = 0; i < 6; i++) {
        if (loading && i === Number(loading)) {
            palautus.push(
                <CircularProgress key={user+i+'loading'}/>
            )
        }
        else {
            palautus.push(
                <Grid item xs={2}
                    key={user+i}
                >
                    <FormControlLabel
                        labelPlacement="top"
                        value={i}
                        label={i}
                        control={
                            <Radio color="primary" size="small"
                                style={{ padding: '0px' }}
                            />}
                    />
                </Grid>
            )
        }
    }
    return palautus;
}

export default Player