import { Typography, Button, Divider } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import YesNoModal from "../../components/YesNoModal";

const PeliAsetukset = ({ handleEndGame, handleDeleteGame }) => {

    const dispatch = useDispatch();
    const [vahvistaPoisto, setVahvistaPoisto] = useState(false);
    return (
    <div>
    <Typography variant="h5" gutterBottom>Poistu pelistä</Typography>
    <Typography paragraph>
        Poistu päävalikkoon. Peli on tallennettu ja tulosten merkkaamista voi jatkaa.
    </Typography>
    <Button size="large" onClick={() => dispatch({ type: 'RESET_ROUND' })} variant="contained" color="primary" fullWidth>Poistu pelistä</Button>

    <Divider style={{ margin: '15px 0px' }} />

    <Typography variant="h5" gutterBottom>Päätä peli</Typography>
    <Typography paragraph>Peli päätetään. Tulosten kirjaaminen suljetaan. Tulokset lasketaan mukaan statistiikkoihin.</Typography>
    <Button onClick={handleEndGame} size="large" variant="contained" color="primary" fullWidth>Päätä peli</Button>

    <Divider style={{ margin: '15px 0px' }} />

    <Typography variant="h5" gutterBottom>Poista peli</Typography>
    <Typography paragraph>Peli poistetaan</Typography>
    <Button size="large" onClick={() => setVahvistaPoisto(true)} variant="contained" color="primary" fullWidth>Poista peli</Button>
    <YesNoModal open={vahvistaPoisto} 
        title="Poistetaanko?"
        text="Haluatko varmasti poistaa pelin? Jos pelaajia on useampia, vain sinut poistetaan pelistä."
        onNoClick={() => setVahvistaPoisto(false)}
        onYesClick={handleDeleteGame}
    />
    </div>
    )
}
export default PeliAsetukset;