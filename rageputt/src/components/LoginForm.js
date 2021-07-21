import { useState } from 'react'
import { Button, TextField, Grid, Backdrop, CircularProgress, Container, Typography, Divider } from '@material-ui/core'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'
import { setUser, clearUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    const [loginProcess, setLoginProcess] = useState(false)
    const [login] = useMutation(LOGIN);
    const client = useApolloClient()

    const handleLogout = async (e) => {
        await client.clearStore()
        window.localStorage.clear()
        dispatch(clearUser());
        dispatch({ type: 'RESET_ROUND' })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginProcess(true);
        login({ variables: { user: e.target.user.value, password: e.target.password.value } }).then(result => {
            window.localStorage.setItem('rageToken', result.data.login.value)
            console.log('Login data: ', result.data.login)
            const sailo = setUser(result.data.login.user.name, result.data.login.user.user);
            dispatch(sailo);
            setLoginProcess(false);
        }).catch(e => {
            dispatch(setNotification('Väärä tunnus tai salasana', 'error'))
            setLoginProcess(false);
        })
    }
    if (user.user) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Kirjautunut</Typography>
                <Typography paragraph>Olet kirjautunut tunnuksella <b>{user.user}</b></Typography>
                <Button onClick={handleLogout} variant="contained" color="primary">Kirjaudu ulos</Button>
            </Container>
        )
    }
    return (
        <Container>
            <Backdrop open={loginProcess}>
                <CircularProgress />
            </Backdrop>
            <Typography variant="h4" gutterBottom>Kirjaudu sisään</Typography>
            <form onSubmit={handleLogin}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField name="user" label="Tunnus" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="password" label="Salasana" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" size="large">Kirjaudu</Button>
                    </Grid>
                </Grid>
            </form>
            <Divider />
            <Typography variant="h6">Unohtuiko salasana</Typography>
            <Typography paragraph>
                <Link to="/palautus">Voi ei, unohdin salasanani</Link>
            </Typography>
        </Container>
    )
}

export default LoginForm;