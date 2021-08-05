import {  Container, Divider, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer";
import Button from "./Button"

const DevPage = () => {

    const dispatch = useDispatch();

    const notify = (type) => {
        dispatch( setNotification('Tämä on kokeilu!', type, 'Kokeilu'))
    }

    return (
        <Container>
            <Typography variant="h3">DevPage</Typography>
            <Typography variant="h5">Tervetuloa salaiselle dev-sivulle!</Typography>
            <Divider />
            <Typography variant="h5">Testaa notifikaatioita</Typography>
            <Button onClick={() => notify('info')}>Info</Button>
            <Button onClick={() => notify('success')}>Success</Button>
            <Button onClick={() => notify('warning')}>Warning</Button>
            <Button onClick={() => notify('error')}>Error</Button>
        </Container>
    )
}
export default DevPage