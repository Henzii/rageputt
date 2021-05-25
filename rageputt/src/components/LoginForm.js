
import { useState } from 'react'

import { Button, TextField, List, ListItem, Backdrop, CircularProgress } from '@material-ui/core'

const LoginForm = () => {

    const [loginProcess, setLoginProcess] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('Login')
        setTimeout( () => {
            setLoginProcess(false);
        }, 5000);
        setLoginProcess(true);
    }
    return (
        <div>
            <Backdrop open={loginProcess}>
                <CircularProgress />
            </Backdrop>

            <h1>Kirjaudu sisään</h1>
            <form onSubmit={handleLogin}>
                <List>
                    <ListItem><TextField label="Tunnus" variant="outlined" fullWidth /></ListItem>
                    <ListItem><TextField label="Salasana" variant="outlined" type="password" fullWidth /></ListItem>
                    <ListItem><Button type="submit" variant="contained" color="primary" size="large">Kirjaudu</Button></ListItem>
                </List>
            </form>
        </div>
    )
}

export default LoginForm;