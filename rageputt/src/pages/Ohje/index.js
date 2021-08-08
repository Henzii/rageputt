import { Container, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import PageContainer from "../../components/PageContainer";
import tuloskortti from '../../assets/tkortti.jpg';
import etaisyys from '../../assets/korti.png';
import { typography } from "@material-ui/system";

const Ohje = () => {


    return (
        <Container>
            <PageContainer>
                <Page>
                    <Typography variant="h4">Pelin valmistelu</Typography>
                    <Typography paragraph>
                    Aloita merkitsemällä etäisyydet metrin välein korista välillä 5 - 10m.
                    <img src={etaisyys} alt="etaisyys" style={{ width: '100%'}} />
                    </Typography>
                </Page>
                <Page>
                    <Typography variant="h4">Uusi peli</Typography>
                    <Typography paragraph>
                        Valitse valikosta 'Uusi peli', klikkaa 'Aloita uusi peli' -nappia ja valitse mahdolliset pelaajat itsesi lisäksi.
                    </Typography>
                    <Typography paragraph>
                        Pelissä on 20 kierrosta. Jokaisella kierroksella puttaat 5 kertaa. Pisteitä saat aina kun putti menee sisään.
                        Seuraavan kierroksen etäisyys määräytyy edellisen kierroksen onnistuneiden puttien perusteella.
                    </Typography>
                </Page>
                <Page>
                    <Typography variant="h4">Tuloskortti</Typography>
                    <img src={tuloskortti} alt="kuva" style={{ width: '100%' }} />
                    <ol>
                        <li>Puttietäisyys</li>
                        <li>Kierros</li>
                        <li>Pisteet</li>
                        <li>Edellinen/seuraava kierros</li>
                        <li>Kieroksen tulos/putteja sisään</li>
                    </ol>
                </Page>
                <Page>
                    <Typography variant="h4">Pelin loppu</Typography>
                    <Typography paragraph>
                        Kun 20 kierrosta on täynnä, valitse pelin asetukset -välilehdestä 'Päätä peli'. Peliä ei voi
                        enää muokata ja tulokset otetaan mukaan tilastoihin.
                    </Typography>
                </Page>
            </PageContainer>
        </Container>
    )
}
export default Ohje;
