import { useState } from 'react'
import { Button, TextField, List, ListItem, Backdrop, CircularProgress } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { setUser, clearUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    const [loginProcess, setLoginProcess] = useState(false)
    const [ login ] = useMutation( LOGIN );
    const handleLogout = async (e) => {
        dispatch( clearUser() );
        window.localStorage.clear()
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginProcess(true);
        login({ variables: { user: e.target.user.value, password: e.target.password.value }}).then(result => {
            window.localStorage.setItem('rageToken', result.data.login.value)
            const sailo = setUser(e.target.user.value);
            dispatch(sailo);
            setLoginProcess(false);
        }).catch(e => {
            console.log('Error, ', e.message)
            setLoginProcess(false);
        })
        
    
    }
    if (user.user) {
        return (
            <div>
                <h1>Kirjautunut</h1>
                <p>Olet kirjautunut {user.user}:na</p>
                <Button onClick={handleLogout} variant="contained" color="primary">Kirjaudu ulos</Button>
            </div>
        )
    }
    return (
        <div>
            <Backdrop open={loginProcess}>
                <CircularProgress />
            </Backdrop>

            <h1>Kirjaudu sisään</h1>
            <form onSubmit={handleLogin}>
                <List>
                    <ListItem><TextField name="user" label="Tunnus" variant="outlined" fullWidth /></ListItem>
                    <ListItem><TextField name="password" label="Salasana" variant="outlined" type="password" fullWidth /></ListItem>
                    <ListItem><Button type="submit" variant="contained" color="primary" size="large">Kirjaudu</Button></ListItem>
                </List>
            </form>
        </div>
    )
}

export default LoginForm;