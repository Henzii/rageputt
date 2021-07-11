import { Typography, TextField } from "@material-ui/core";

import Button from '../../components/Button'

const VaihdaEmail = ({me}) => {

    return (
        <div>
            <Typography variant="h5" label="email">Vaihda email</Typography>
            <TextField variant="outlined" name="email" value={me.email} placeholder="Uusi email" size="small" />
            <Button>Vaihda</Button>
        </div>
    )

}
export default VaihdaEmail;