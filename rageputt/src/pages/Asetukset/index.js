import { Backdrop, CircularProgress, TextField, Button, Container, Typography, Divider } from "@material-ui/core"
import { useState } from "react";

import useGetMe from "../../hooks/useGetMe";
import OmatTiedot from "./OmatTiedot";

import SalasananVaihto from './SalasananVaihto'
import VaihdaEmail from './VaihdaEmail';

import { CHANGE_SETTINGS } from "../../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import Kytkimet from "./Kytkimet";
import PoistaTunnukset from "./PoistaTunnukset";

const Asetukset = () => {

    const { me, updateCache } = useGetMe();
    const dispatch = useDispatch()
    const [changeSettings] = useMutation(CHANGE_SETTINGS)
    const client = useApolloClient()

    const handleChangeSettings = async (newSettings) => {
        const oldSettings = {
            name: '',
            email: '',
            password: '',
            shareStats: null,
            ignoreFriendRequests: null,
        }
        try {
            const me = await changeSettings({ variables: { ...oldSettings, ...newSettings } })
            updateCache(me.data.changeSettings)
            dispatch(setNotification('Tietoja vaihdettu', 'success'))
        } catch (e) {
            console.log(e)
            dispatch(setNotification(`Virhe! ${e.message}`, 'error'))

        }
    }

    const handleCelarCache = async () => {
        await client.clearStore()
        dispatch(setNotification('Välimuisti tyhjennetty', 'info'))
    }
    if (me === null) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }
    return (
        <Container>
            <OmatTiedot me={me} />
            <Divider />
            <Kytkimet me={me} handleChangeSettings={handleChangeSettings} />
            <Divider />
            <SalasananVaihto vaihdaSalasana={handleChangeSettings} />
            <Divider />
            <VaihdaNayttonimi handleChangeName={handleChangeSettings} />
            <Divider />
            <VaihdaEmail me={me} handleChangeEmail={handleChangeSettings} />
            <Divider />
            <Typography variant="h5">Tyhjennä välimuisti</Typography>
            <Typography paragraph>Jos tuntuu että asiat eivät näy oikein, voit yrittää tyhjentää välimuistin.</Typography>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleCelarCache}>Tyhjennä välimuisti</Button>
            <Divider />
            <PoistaTunnukset me={me} />
        </Container>
    )

}
const VaihdaNayttonimi = ({ handleChangeName }) => {

    const [newName, setNewName] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        handleChangeName({ name: newName })
        setNewName('')

    }
    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5">Vaihda näyttönimi</Typography>
            <TextField value={newName} variant="outlined" label="Uusi nimi" size="small" onChange={(e) => setNewName(e.target.value)} />
            &nbsp;<Button variant="contained" type="submit" disabled={(newName.length < 3)} color="primary">Ok</Button>
        </form>

    )
}
export default Asetukset