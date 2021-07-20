import { useMutation } from "@apollo/client"
import { ListItem, List, Button, TextField, Divider, Container, Typography } from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router"
import { setNotification } from "../../reducers/notificationReducer"

import { CREATE_USER } from '../../graphql/mutations'

const CreateUserForm = () => {

    const [createUser, cuData] = useMutation(CREATE_USER)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({ tunnus: false, password: false })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vars = {
            user: e.target.user.value,
            password: e.target.password.value,
            name: e.target.name.value,
            email: e.target.email.value
        }
        if (vars.user === '') {
            setErrors({ ...errors, tunnus: true })
        } else if (vars.password === '' || vars.password !== e.target.password2.value) {
            setErrors({ ...errors, password: true })
        }
        else {
            try {
                await createUser({ variables: vars })
                dispatch(setNotification('Tunnukset luotiin onnistuneesti', 'success'))
            } catch (e) {
                dispatch(setNotification('Virhe tunnusten luonnissa: ' + e.message, 'error'))
            }
        }
    }
    if (cuData.loading) {
        return (<h2>Creating user...</h2>)
    }
    if (cuData.called && !cuData.error) {
        return (<Redirect to="/login" />)
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Luo tunnus</Typography>
            <Typography variant="h5">Perustiedot</Typography>
            <form onSubmit={handleSubmit}>
                <List>
                    <ListItem><TextField error={errors.tunnus} name="user" label="Tunnus" variant="outlined" fullWidth></TextField></ListItem>
                    <ListItem><TextField error={errors.password} name="password" type="password" label="Salasana" variant="outlined" fullWidth></TextField></ListItem>
                    <ListItem><TextField error={errors.password} name="password2" label="Salasana uudestaan" type="password" variant="outlined" fullWidth></TextField></ListItem>
                    <Divider style={{ margin: '15px 0px' }} />
                    <Typography variant="h5" gutterBottom>Lisätiedot</Typography>
                    <Typography paragraph>Ei pakollisia. Sähköpostiosoitteen antaminen mahdollistaa tunnusten palauttamisen.</Typography>
                    <ListItem><TextField name="name" label="Nimi" variant="outlined" fullWidth></TextField></ListItem>
                    <ListItem><TextField name="email" label="Sähköposti" variant="outlined" fullWidth></TextField></ListItem>
                    <ListItem><Button type="submit" size="large" variant="contained" fullWidth color="primary">Luo tunnus</Button></ListItem>
                </List>
            </form>
        </Container>
    )
}

export default CreateUserForm