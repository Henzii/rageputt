import { Backdrop, CircularProgress, TextField, Button, Container, Typography, Divider } from "@material-ui/core"
import { useState } from "react";

import useGetMe from "../../hooks/useGetMe";
import OmatTiedot from "./OmatTiedot";

import SalasananVaihto from './SalasananVaihto'
import VaihdaEmail from './VaihdaEmail';

import { CHANGE_SETTINGS } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

const Asetukset = () => {

    const { me } = useGetMe();

    const vaihdaSalasana = (e) => {
        e.preventDefault()
        console.log('Vaihdetaan salasana')
        e.target.uusiPw.value = ''
        e.target.uusiPw2.value = ''

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
            <SalasananVaihto vaihdaSalasana={vaihdaSalasana} />
            <Divider style={{ margin: "10px 0px" }} />
            <VaihdaNayttonimi />
            <Divider style={{ margin: "10px 0px" }} />
            <VaihdaEmail me={me} />
        </Container>
    )

}
const VaihdaNayttonimi = () => {
    return (
        <div>
            <Typography variant="h5" gutterBottom>Vaihda näyttönimi</Typography>
            <TextField name="uusiNimi" variant="outlined" label="Uusi nimi" size="small" />
            <Button variant="contained" color="primary">Ok</Button>
        </div>

    )
}
export default Asetukset