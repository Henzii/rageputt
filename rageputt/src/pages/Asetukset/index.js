import { Backdrop, CircularProgress, TextField, Button, Container, Typography, Divider } from "@material-ui/core"
import { useState } from "react";

import useGetMe from "../../hooks/useGetMe";
import OmatTiedot from "./OmatTiedot";

import SalasananVaihto from './SalasananVaihto'
import VaihdaEmail from './VaihdaEmail';

import { CHANGE_SETTINGS } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";

const Asetukset = () => {

    const { me, refetch } = useGetMe();
    const dispatch = useDispatch()
    const [changeSettings] = useMutation(CHANGE_SETTINGS)

    const handleChangeSettings = (newSettings) => {
        const oldSettings = {
            name: '',
            email: '',
            password: '',
        }
        changeSettings({ variables: { ...oldSettings, ...newSettings }}).then(res => {
            dispatch(setNotification('Tietoja vaihdettu', 'success'))
            refetch()
        }).catch(e => {
            console.log(e)
            dispatch(setNotification(`Virhe! ${e.message}`, 'error'))
        })
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
            <Divider style={{ margin: '10px 0px'}} />

            <SalasananVaihto vaihdaSalasana={handleChangeSettings} />
            <Divider style={{ margin: "10px 0px" }} />
            <VaihdaNayttonimi handleChangeName={handleChangeSettings} />
            <Divider style={{ margin: "10px 0px" }} />
            <VaihdaEmail me={me} handleChangeEmail={handleChangeSettings} />
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
            <Typography variant="h5" gutterBottom>Vaihda näyttönimi</Typography>
            <TextField value={newName} variant="outlined" label="Uusi nimi" size="small" onChange={(e) => setNewName(e.target.value)} />
            <Button variant="contained" type="submit" disabled={(newName.length < 3)} color="primary">Ok</Button>
        </form>

    )
}
export default Asetukset