import useGetMe from '../../hooks/useGetMe'
import { Dialog, Typography, Container, Backdrop, CircularProgress, FormControlLabel, Checkbox, Button, Grid, FormGroup } from '@material-ui/core'
import DropDown from '../../components/DropDown';
import { useState } from 'react';

import { Person, PersonOutline } from '@material-ui/icons'

const NewGameModal = ({ open, setModal, handleNewGame }) => {

    const { me } = useGetMe();
    const [kaverit, setKaverit] = useState([])

    if (me === null) return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    )
    console.log(kaverit)
    return (
        <Dialog open={open}>
            <Container>
                    <Typography variant="h4">Uusi peli</Typography>
                    <Typography variant="h5">Pelimoodi: <DropDown options={['Normaali']}></DropDown></Typography>
                    <Typography variant="h5">Pelaajat</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checkedIcon={<Person fontSize="large" />} checked={true} />} label="Minä" />
                        {me.friends.map(f => <KaveriCheckBox kaverit={kaverit} setKaverit={setKaverit} key={f.user} kaveri={f} />)}
                    </FormGroup>
                    <Grid container justify="space-around" style={{ marginTop: 20 }}>
                        <Grid item><Button color="primary" variant="contained" onClick={() => handleNewGame(kaverit)}>Ok</Button></Grid>
                        <Grid item><Button color="secondary" variant="contained" onClick={() => setModal(false)}>Cancel</Button></Grid>
                    </Grid>
            </Container>
        </Dialog>
    )
}
const KaveriCheckBox = ({ kaveri, kaverit, setKaverit }) => {
    const handleChange = () => {
        if (!kaverit.includes(kaveri.id)) setKaverit(kaverit.concat(kaveri.id))
        else setKaverit(kaverit.filter(k => k !== kaveri.id))
    }
    return (
        <FormControlLabel control={
            <Checkbox
                onChange={handleChange}
                icon={<PersonOutline fontSize="large" />}
                checkedIcon={<Person fontSize="large" color="primary" />}
            />} label={kaveri.name} />
    )
}
export default NewGameModal