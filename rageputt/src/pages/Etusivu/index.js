import { Container, Typography, Divider, Paper} from '@material-ui/core'

const Etusivu = () => {
    return (
        <Container>
            <Paper elevation={3} className="paperi">
            <Typography variant="h4">
                Mitä tämä on?
            </Typography>
            <Typography paragraph>
                Rageputt on Fullstackopen 2021:n harjoitustyön tulos. Sovelluksen tarkoitus
                on pitää kirjaa JYLY-pelien tuloksista.
            </Typography>
            </Paper>
            <Paper elevation={2} className="paperi">
            <Typography variant="h4">
                No mikä se JYLY sitten on?
            </Typography>
            <Typography paragraph>
                JYLY Putting game is a putt practice drill/game created by Markus Lindqvist 
                (found by nickename JYLY in dgcr forums as well as frisbeegolf-forum). The drill 
                emphasizes putting from various distances. The more putts you sink and the further 
                you do it, more points you get. (copypaste)
            </Typography>
            </Paper>
            <Paper elevation={2} className="paperi">
            <Typography variant="h4">
               Kerro lisää
            </Typography>
            <Typography paragraph>
                Jotta voit käyttää sovellusta, tulee sinun luoda oma tunnus. Tämän jälkeen voit aloittaa
                armottoman puttaamisen. Myöhemmin kun on liian pimeää puttaamiselle, voit ihailla ihanaa
                diagrammidataa! 
            </Typography>
            <Typography paragraph>
                Jos satut omistamaan ystäviä, voit lähettää heille kaveripyynnön ja lisätä heidät ystäviksesi.
                Tämän jälkeen voitte yhdessä tuumin puttailla toisianne.
            </Typography>
            </Paper>
        </Container>

    )
}
export default Etusivu
