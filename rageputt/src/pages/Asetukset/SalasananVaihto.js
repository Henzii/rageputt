import { Grid, Typography, TextField, Button } from '@material-ui/core'


const SalasananVaihto = ({ vaihdaSalasana }) => {
    return (
        <div>
            <form onSubmit={vaihdaSalasana}>
                <Typography variant="h5" gutterBottom>Vaihda salasana</Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" name="uusiPw" label="Uusi salasana" size="small" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" name="uusiPw2" label="Uusi uudestaan" size="small" />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Vaihda</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default SalasananVaihto