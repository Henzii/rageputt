import { Button, Container, Dialog, Grid, Typography } from "@material-ui/core"

const YesNoModal = ({ open, 
    title = "Oletko varma?", 
    text = "Aivan varma?",
    close=null,
    onYesClick,
    onNoClick=null
}) => {
    if (!open) return null
    return (
        <Dialog open onClick={close}>
            <Container style={{ paddingBottom: '15px'}}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
                <Typography paragraph>{text}</Typography>
                <Grid container style={{ flexGrow: 1, width: '100%', textAlign: 'center' }}>
                    <Grid item xs={6} >
                        <Button variant="contained" color="primary" onClick={onYesClick}>Kyllä</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={onNoClick}>Ei</Button>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}
export default YesNoModal