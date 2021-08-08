import { Button, Container, Divider, Grid, TextField, Typography } from "@material-ui/core"
import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import useGetMe from "../hooks/useGetMe";

const Palaute = () => {

    const { me } = useGetMe();
    
    const [nimi, setNimi ] = useState('')
    const [email, setEmail] = useState('')
    const [viesti, setViesti] = useState('')
    const [rating, setRating] = useState(4)

    const [msgSent, setMsgSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit!')
        setMsgSent(true)
    }

    useEffect( () => {
        if (me !== null) {
            setNimi(me.name)
            setEmail(me.email)
        }
    }, [me])
    if (msgSent === true) {
        return (<Container>
            <Typography variant="h4">Palaute lähetetty</Typography>
            <Typography paragraph>Kiitos palautteestasi!</Typography>
        </Container>)
    }
    return (
        <Container>
            <form onSubmit={handleSubmit}>
            <Typography variant="h4">Palaute</Typography>
            <Typography variant="h5" style={{ marginBottom: 0 }}>Nimi</Typography>
            <TextField variant="outlined" placeholder="Nimi" size="small" value={nimi} onChange={(e) => setNimi(e.target.value)} />
            
            <Typography variant="h5" style={{ marginBottom: 0, marginTop: 10 }}>Email</Typography>
            <TextField variant="outlined" placeholder="Email" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Typography variant="h5" style={{ marginBottom: 0, marginTop: 10 }}>Arvosana</Typography>
            <Rating value={rating} name="rating"
                onChange={(e, value) => setRating(value)}
                size="large"
            />

            <Typography variant="h5" style={{ marginBottom: 0, marginTop: 10 }}>Viesti</Typography>
            <TextField variant="outlined" placeholder="Kirjoita viesti..." 
                size="small" value={viesti} onChange={(e) => setViesti(e.target.value)}
                multiline={true} rows={7} fullWidth
            />
            <Button type="submit" style={{ marginTop: 10 }} variant="contained" color="primary" fullWidth>Lähetä palaute</Button>
            </form>
        </Container>
    )
}
export default Palaute;