import { Button, Paper } from '@material-ui/core'
import { timestamp2String } from '../utils/stuff'

const Pelikortti = ({ peli, aktivoi }) => {
    console.log(peli)
    return (
        <Paper style={{padding: '5px', marginBottom:'3px'}} elevation={3}>
            { timestamp2String(peli.timestamp) } {  }
            <Button size="small" onClick={() => aktivoi(peli.id)}>Aktivoi</Button>
        </Paper>
    )

}
export default Pelikortti