import { Button, Container, Dialog, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import YesNoModal from "../../components/YesNoModal";

const PoistaTunnukset = ({me}) => {
    const [open, setOpen] = useState(false)
    const [nimi, setNimi] = useState('')
    return (
        <>
        <Typography variant="h5">Poista tunnukset</Typography>
        <Typography paragraph>
            Tunnuksesi poistetaan, pelit tuhotaan, frisbeet heitetään lampeen.
        </Typography>
        <Button fullWidth variant="contained" color="secondary" onClick={() => setOpen(true)}>Poista tunnuksesi</Button>
        <Dialog open={open} fullWidth maxWidth="xs" PaperProps={ { style: { borderRadius: 20, border: (nimi === me.user) ? '5px solid red' : null }} } >
            <Container>
                <Typography variant="h4">Tunnusten poisto</Typography>
                <p>
                Vahvista poisto kirjoittamalla tunnuksesi tekstikenttään
                </p>
                <TextField variant="outlined" size="small" placeholder="Tunnuksesi..." onChange={ (e) => setNimi(e.target.value) } />
                <Grid container style={{ marginTop: 20 }} alignContent='space-between'>
                    <Grid item xs>
                    <Button variant="contained" color="secondary" disabled={nimi !== me.user }>Poista</Button>
                    </Grid>
                    <Grid item xs>

                    <Button variant="contained" color="primary">Peruuta</Button>
                    </Grid>
            </Grid>
            </Container>
        </Dialog>
        </>
    )
}
export default PoistaTunnukset;