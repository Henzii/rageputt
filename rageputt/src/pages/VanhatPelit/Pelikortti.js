import { Button, Card, CardHeader, CardContent, Collapse } from '@material-ui/core'
import { laskePisteet, timestamp2String, tulokset2ChartData } from '../../utils/stuff'
import { useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WarningIcon from '@material-ui/icons/Warning'

import BarChart from '../../components/BarChart'

const Pelikortti = ({ peli, aktivoi, poista, user }) => {

    let { tulokset } = peli.players.find(p => p.user.user === user)
    const pisteet = laskePisteet(tulokset)

    const [showStats, setShotStats] = useState(false)

    if (tulokset.length === 0) {
        tulokset = [0]
    }
    return (
        <Card style={{ marginBottom: '5px' }} variant="outlined">
            <CardHeader
                avatar= {
                    (!peli.finished && <WarningIcon style={{color: 'orange'}}/>)
                }
                action={
                    <IconButton onClick={() => setShotStats(!showStats)} size="small">
                        <ExpandMoreIcon />
                    </IconButton>
                }

                title={ (showStats) ? pisteet : null}
                subheader={ ((showStats) ? timestamp2String(peli.timestamp) : pisteet) }
            />
            <Collapse in={showStats} unmountOnExit timeout="auto">
                <CardContent style={{paddingTop: '0px'}}>
                    <Button size="small" variant="outlined" color="primary" onClick={() => aktivoi(peli.id)}>Aktivoi</Button>&nbsp;                                 
                    <Button size="small" variant="outlined" color="secondary" onClick={() => poista(peli.id)}>Poista</Button>
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