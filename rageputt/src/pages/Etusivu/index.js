import { Container, Typography, Paper, Link } from '@material-ui/core'
import useStyles from '../../hooks/useStyles'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Etusivu = () => {

    const tyylit = useStyles()

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <Container>
            <Paper className={tyylit.paper} id="iso-naytto">
                <Typography variant="h4">
                    Onpas iso näyttö
                </Typography>
                <Typography paragraph>
                    Tämä sovellus on suunniteltu käytettäväksi kännykän pikkuruiselta näytöltä.
                </Typography>
            </Paper>
            <Paper className={tyylit.paper}>
                <Typography variant="h4">
                    Mitä tämä on?
                </Typography>
                <Typography paragraph>
                    Rageputt on Fullstackopen 2021 -kurssin harjoitustyön tulos. Fullstackopen on Helsingin yliopiston
                    järjestämä kurssi jossa tutustutaan JavaScriptilla tapahtuvaan moderniin websovelluskehitykseen. Pääpaino on
                    React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa
                    REST-rajapinnoissa.
                </Typography>
                <Typography paragraph>
                    <Link>fullstackopen.com</Link>
                </Typography>
            </Paper>
            <Paper className={tyylit.paper} data-aos="fade-up">
                <Typography variant="h4">
                    Rageputt
                </Typography>
                <Typography paragraph>
                    Sovelluksen idea on pitää kirjaa frisbeegolffin JYLY-puttipelin tuloksista. Tulokset tallentuvat palvelimelle
                    reaaliaikaisesti.
                </Typography>

            </Paper>
            <Paper className={tyylit.paper} data-aos="fade-up">
                <Typography variant="h4">
                    JYLY?!?
                </Typography>
                <Typography paragraph>
                    JYLY Putting game is a putt practice drill/game created by Markus Lindqvist
                    (found by nickename JYLY in dgcr forums as well as frisbeegolf-forum). The drill
                    emphasizes putting from various distances. The more putts you sink and the further
                    you do it, more points you get. (copypaste)
                </Typography>
            </Paper>
            <Paper className={tyylit.paper} data-aos="fade-up">
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
            <Paper className={tyylit.paper} data-aos="fade-up">
                <Typography variant="h4">
                    Vanhan pelin jatkaminen
                </Typography>
                <Typography paragraph>
                    Jos haluat jatkaa vanhaa peliä, valitse 'vanhat pelit' -osiosta kyseinen peli ja paina aktivointinappia. Tämän
                    jälkeen voit jatkaa tulosten kirjaamista 'uusi peli' -sivulla.
                </Typography>
                <Typography paragraph>
                    Avoimen pelin tunnistaa oranssista kolmiosta.
                </Typography>

            </Paper>
            <Paper className={tyylit.paper} data-aos="fade-up">
                <Typography variant="h4">
                    Pelin päättäminen
                </Typography>
                <Typography paragraph>
                    Kun peli on päätetty peliasetukse sivulta, tulosten kirjaaminen estetään ja tulokset otetaan huomioon statistiikka-sivulla.
                </Typography>

            </Paper>
            

        </Container>

    )
}
export default Etusivu
