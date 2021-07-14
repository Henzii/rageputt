import { Container, Typography, TextField } from "@material-ui/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import Button from './Button'

const RestoreAccount = () => {
    const [mailSent, setMailSent ] = useState(false)
    const handleResetAccount = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        e.target.email.value = ''
        setMailSent(true)
    }
    if (mailSent) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Salasana lähetetty</Typography>
                <Typography paragraph>Kertakäyttöinen salasana on lähetetty sähköpostiisi, olettaen että annoit
                oikean sähköpostiosoitteen.</Typography>
                <Typography paragraph>Tarkista sähköpostisi, sen jälkeen <Link to="/login">kirjaudu sisään</Link>.</Typography>
            </Container>
        )
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Tunnuksen palautus
            </Typography>
            <Typography paragraph>
                Kirjoita alla olevaan kenttään sähköpostiosoitteesi. Kertakäyttöinen salasana lähetetään antamaasi sähköpostiosoitteeseen.
                Mikäli et koskaan liittänyt sähköpostiosoitetta tunnukseesi niin... tough luck.
            </Typography>
            <form onSubmit={handleResetAccount}>
                <TextField label="Sähköpostiosoite" name="email" variant="outlined" fullWidth />
                <Button type="submit">Palauta</Button>
            </form>
        </Container>
    )
}
export default RestoreAccount