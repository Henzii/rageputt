import { Container, Typography, Paper, Link } from '@material-ui/core'
import useStyles from '../../hooks/useStyles'
import { useLocation } from 'react-router-dom'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Etusivu = () => {

    const tyylit = useStyles()
    
    // Jos osoite päättyy '/test' -> näytetään myöhempänä testitunnukset
    const location = useLocation();
    const testMode = location.pathname === "/test"

    useEffect(() => {
        Aos.init({ duration: 3000 })
    }, [])

    return (
        <Container>
            {testMode && 
                <Paper className={tyylit.paper} id="testitunnarit">
                    <Typography variant="h3">Testaa!</Typography>
                    <Typography>
                        Jos et halua luoda omia tunnuksia, mutta silti testata sovelluksen toimintaa,
                        voit antaa tunnukseksi <b>tester1</b> ja salasanaksi <b>password</b>.
                    </Typography>
                </Paper>
            }
            <Paper className={tyylit.paper} id="iso-naytto">
                <Typography variant="h4">
                    Iso näyttö
                </Typography>
                <Typography paragraph>
                    Onpas Teillä todella suuri ja mahtava näyttö. Tiedoksenne että
                    tämä sovellus on suunniteltu käytettäväksi kännykän pikkuruiselta näytöltä.
                </Typography>
            </Paper>
            <Paper className={tyylit.paper} data-aos="fade-up">
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
                    reaaliaikaisesti. Pelejä voi pelata yksin tai yhdessä kaverin kanssa. Jokaisella peliin osallistuvalla tulee
                    olla oma tunnus. Pelatessa porukalla tarvitsee vain yhden henkilön kirjata tuloksia sillä tulokset päivittyvät
                    automaattisesti kaikille pelaajille.
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
                    Jotta voit käyttää sovellusta, tulee sinun luoda oma tunnus. Tunnuksen luomiseen riittää vain että keksit itsellesi
                    tunnuksen ja salasanan. Voit myös antaa sähköpostiosoitteesi siltä varalta että unohdat
                    salasanasi.
                </Typography>
                <Typography paragraph>
                    Tunnuksen luotuasi voit aloittaa armottoman puttaamisen. Myöhemmin kun on liian pimeää puttaamiselle, voit ihailla ihanaa
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
