import { Typography, Grid, Paper } from "@material-ui/core"

const OmatTiedot = ({ me }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Tiedot</Typography>
            <Grid container component={Paper} className="paperi">
                <Grid item xs={6}>Tunnus</Grid>
                <Grid item xs={6}>{me.user}</Grid>
                <Grid item xs={6}>Nimi</Grid>
                <Grid item xs={6}>{me.name}</Grid>
                <Grid item xs={6}>Sähköposti</Grid>
                <Grid item xs={6}>{me.email}</Grid>
            </Grid>
        </div>
    )
}
export default OmatTiedot