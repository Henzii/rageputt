import { useQuery } from "@apollo/client"
import { Backdrop, CircularProgress, Grid, TextField, } from "@material-ui/core"
import { GET_ME } from "../queries"

const Asetukset = () => {

    const user = useQuery(GET_ME)
    if (user.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }
    return (
        <div>
            <h1>Tiedot</h1>
            <Grid container>
                <Grid item xs={6}>Tunnus</Grid>
                <Grid item xs={6}>{user.data.getMe.user}</Grid>
                <Grid item xs={6}>Nimi</Grid>
                <Grid item xs={6}>{user.data.getMe.name}</Grid>
                <Grid item xs={6}>Sähköposti</Grid>
                <Grid item xs={6}>{user.data.getMe.email}</Grid>
            </Grid>
            <h2>Vaihda salasana</h2>
            <TextField type="password" variant="outlined" label="Uusi salasana" fullWidth size="small"/>
            <TextField type="password" variant="outlined" label="Salasana uudestaan" fullWidth size="small"/>
        </div>
    )

}
export default Asetukset