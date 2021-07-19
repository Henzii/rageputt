import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { useState } from 'react'

const SalasananVaihto = ({ vaihdaSalasana }) => {

    
    const [ pwHandler, setPwHandler ] = useState({
        uusiPw: '',
        uusiPw2: '',
        ok: false
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        vaihdaSalasana( { password: pwHandler.uusiPw } )
        setPwHandler( { uusiPw: '', uusiPw2: '', ok: false })
    }
    const handleChange = (e) => {
        const updatedPwHandler = {...pwHandler}
        updatedPwHandler[e.target.name] = e.target.value
        if (updatedPwHandler.uusiPw === updatedPwHandler.uusiPw2 && updatedPwHandler.uusiPw !== '')
            updatedPwHandler.ok = true
        else updatedPwHandler.ok = false
        setPwHandler(updatedPwHandler)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>Vaihda salasana</Typography>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField variant="outlined" value={pwHandler.uusiPw} name="uusiPw" label="Uusi salasana" size="small" type="password" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" value={pwHandler.uusiPw2} name="uusiPw2" label="Uusi uudestaan" size="small" type="password" onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit" disabled={!pwHandler.ok}>Vaihda</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SalasananVaihto