import { Container, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import PageContainer from "../../components/PageContainer";
import tuloskortti from '../../assets/tkortti.jpg';

const Ohje = () => {


    return (
        <Container>
            <PageContainer>
                <Page>
                    <Typography variant="h4">Pelaaminen</Typography>
                    <Typography paragraph>
                    Valitse valikosta uusi peli. Klikkaa 'Alita uusi peli' -nappia. Sen jälkeen valitse pelaajat.
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
            </PageContainer>
        </Container>
    )
}
export default Ohje;
