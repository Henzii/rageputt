import { useQuery } from "@apollo/client"
import { Backdrop, CircularProgress, Grid, TextField, Button, Container, Typography, Paper, Divider } from "@material-ui/core"
import { GET_ME } from "../../queries"

import SalasananVaihto from './SalasananVaihto'

const Asetukset = () => {

    const user = useQuery(GET_ME)

    const vaihdaSalasana = (e) => {
        e.preventDefault()
        console.log('Vaihdetaan salasana')
        e.target.uusiPw.value = ''
        e.target.uusiPw2.value = ''

    }

    if (user.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Tiedot</Typography>
            <Typography>
                <Grid container component={Paper} className="paperi">
                    <Grid item xs={6}>Tunnus</Grid>
                    <Grid item xs={6}>{user.data.getMe.user}</Grid>
                    <Grid item xs={6}>Nimi</Grid>
                    <Grid item xs={6}>{user.data.getMe.name}</Grid>
                    <Grid item xs={6}>Sähköposti</Grid>
                    <Grid item xs={6}>{user.data.getMe.email}</Grid>
                </Grid>
                
                <SalasananVaihto vaihdaSalasana={vaihdaSalasana} />

                <Divider style={{ margin: "10px 0px"}} />

                <Typography variant="h5" gutterBottom>Vaihda näyttönimi</Typography>

                <TextField name="uusiNimi" variant="outlined" label="Uusi nimi" size="small" />
                <Button variant="contained" color="primary">Ok</Button>
            </Typography>
        </Container>
    )

}
export default Asetukset