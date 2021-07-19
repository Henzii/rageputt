import { Typography, Grid, Paper } from "@material-ui/core"

const OmatTiedot = ({ me }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Tiedot</Typography>
            <Typography variant="h6">Tunnus</Typography>
            <Typography>{me.user}</Typography>

            <Typography variant="h6">Näyttönimi</Typography>
            <Typography>{me.name}</Typography>

            <Typography variant="h6">Sähköposti</Typography>
            <Typography>{me.email}</Typography>
        </div>
    )
}
export default OmatTiedot