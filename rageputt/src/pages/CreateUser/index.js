import { useMutation } from "@apollo/client"
import { TextField, Divider, Container, Typography, Grid } from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router"
import { setNotification } from "../../reducers/notificationReducer"

import { CREATE_USER } from '../../graphql/mutations'

import Button from '../../components/Button'
import useIsUsernameAvailable from "../../hooks/useIsUsernameAvailable"

const CreateUserForm = () => {

    const [createUser, cuData] = useMutation(CREATE_USER)
    const dispatch = useDispatch()

    const { username, setName, available } = useIsUsernameAvailable()

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
            <Typography variant="h4">Luo tunnus</Typography>
            <Typography variant="h5">Perustiedot</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField error={errors.tunnus || available === false } name="user" label="Tunnus" variant="outlined" required 
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            helperText={ (available === false) ? 'Tunnus on jo käytössä' : ''}
                        />
                    </Grid>
                    <Grid item>
                        <TextField error={errors.password} name="password" type="password" label="Salasana" variant="outlined" required  />
                    </Grid>
                    <Grid item>
                        <TextField error={errors.password} name="password2" label="Salasana uudestaan" type="password" variant="outlined" required />
                    </Grid>
                </Grid>

                <Divider />
                <Typography variant="h5" gutterBottom>Lisätiedot</Typography>
                <Typography paragraph>Ei pakollisia. Sähköpostiosoitteen antaminen mahdollistaa tunnusten palauttamisen.</Typography>

                <Grid container direction="column" spacing={1}>
                    <Grid item>
                    <TextField name="name" label="Nimi" variant="outlined" />

                    </Grid>
                    <Grid item>
                    <TextField name="email" label="Sähköposti" variant="outlined" fullWidth />

                    </Grid>
                    <Grid item>
                    <Button disabled={(available === false)} type="submit" size="large" variant="contained"color="primary">Luo tunnus</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default CreateUserForm