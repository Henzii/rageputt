import { useApolloClient, useMutation } from "@apollo/client";
import { Button, Container, Dialog, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_ACCOUNT } from "../../graphql/mutations";
import { setNotification } from "../../reducers/notificationReducer";
import { clearUser } from "../../reducers/userReducer";
import { useHistory } from 'react-router-dom';

const PoistaTunnukset = ({ me }) => {
    const [open, setOpen] = useState(false)
    const [nimi, setNimi] = useState('')

    const [deleteAccount] = useMutation(DELETE_ACCOUNT);
    const client = useApolloClient();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => {
        setNimi('');
        setOpen(false);
    }
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount()
            client.clearStore()
            window.localStorage.clear()
            dispatch(clearUser());
            dispatch(setNotification('Tunnuksesi on nyt poistettu, heihei!', 'warning', 'Tunnukset poistettu'))
            history.push('/')
        } catch (e) {
            console.log(e)
            dispatch(setNotification('Jokin meni peieleen! :(', 'error', 'VIRHE'))
        }
    }
    return (
        <>
            <Typography variant="h5">Poista tunnukset</Typography>
            <Typography paragraph>
                Tunnuksesi poistetaan, pelit tuhotaan, frisbeet heitetään lampeen.
            </Typography>
            <Button fullWidth variant="contained" color="secondary" onClick={() => setOpen(true)}>Poista tunnuksesi</Button>
            <Dialog open={open} fullWidth maxWidth="xs" PaperProps={{ style: { borderRadius: 20, border: (nimi === me.user) ? '5px solid red' : null } }} >
                <Container>
                    <Typography variant="h4">Tunnusten poisto</Typography>
                    <p>
                        Vahvista poisto kirjoittamalla tunnuksesi tekstikenttään
                    </p>
                    <TextField variant="outlined" size="small" placeholder="Tunnuksesi..." value={nimi} onChange={(e) => setNimi(e.target.value)} />
                    <Grid container style={{ marginTop: 20 }} alignContent='space-between'>
                        <Grid item xs>
                            <Button variant="contained" color="secondary" onClick={handleDeleteAccount} disabled={nimi !== me.user}>Poista</Button>
                        </Grid>
                        <Grid item xs>

                            <Button variant="contained" color="primary" onClick={handleClose}>Peruuta</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </>
    )
}
export default PoistaTunnukset;