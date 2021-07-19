import { Typography, TextField } from "@material-ui/core";
import { useState } from "react";
import Button from '../../components/Button'

const VaihdaEmail = ({ handleChangeEmail }) => {

    const [newEmail, setNewEmail ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangeEmail({ email: newEmail })
        setNewEmail('')
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" label="email">Vaihda email</Typography>
            <TextField variant="outlined" 
                name="email" 
                value={newEmail} 
                placeholder="Uusi email" 
                size="small" 
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button type="submit" disabled={!(validateEmail(newEmail))}>Vaihda</Button>
        </form>
    )

}
export default VaihdaEmail;