import { Button, Paper, Card, CardHeader, CardContent, Collapse } from '@material-ui/core'
import { laskePisteet, statistiikat, timestamp2String, tulokset2ChartData } from '../utils/stuff'
import { useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BarChart from '../components/BarChart'

const Pelikortti = ({ peli, aktivoi, user }) => {

    const { tulokset } = peli.players.find(p => p.user.user === user)
    const pisteet = laskePisteet(tulokset)

    const [showStats, setShotStats] = useState(false)
    console.log(tulokset, tulokset2ChartData(tulokset))
    return (
        <Card style={{ marginBottom: '5px' }}>
            <CardHeader
                action={
                    <IconButton onClick={() => setShotStats(!showStats)} size="small">
                        <ExpandMoreIcon />
                    </IconButton>
                }
                title={ (showStats) ? pisteet : null}
                subheader={ (showStats) ? timestamp2String(peli.timestamp) : pisteet }
            />
            <Collapse in={showStats} unmountOnExit timeout="auto">
                <CardContent>
                    <Typography>
                        Puttiprossa: { (tulokset.reduce((total, cur) => total+cur) / (tulokset.length*5) * 100).toFixed()}
                    </Typography>
                    <BarChart data={tulokset2ChartData(tulokset)} />
                </CardContent>
            </Collapse>
        </Card>
    )

}
export default Pelikortti