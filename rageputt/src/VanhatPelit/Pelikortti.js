import { Button, Paper } from '@material-ui/core'
import { laskePisteet, statistiikat, timestamp2String } from '../utils/stuff'

const Pelikortti = ({ peli, aktivoi, user }) => {

    const { tulokset } = peli.players.find(p => p.user.user === user)
    const pisteet = laskePisteet(tulokset)

    return (
        <Paper style={{padding: '5px', marginBottom:'5px'}} elevation={3}>
            { timestamp2String(peli.timestamp) } {pisteet}
            <Button size="small" onClick={() => aktivoi(peli.id)}>Aktivoi</Button>
        </Paper>
    )

}
export default Pelikortti