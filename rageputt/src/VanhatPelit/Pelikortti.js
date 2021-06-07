import { Button } from '@material-ui/core'

const Pelikortti = ({ peli, aktivoi }) => {
    return (
        <Button onClick={() => aktivoi(peli)} fullWidth variant="outlined" style={{marginBottom: '5px'}}>{peli}</Button>
    )

}
export default Pelikortti