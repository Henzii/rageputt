import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import useIsUsernameAvailable from '../../hooks/useIsUsernameAvailable'

const FriendRequestForm = ({ handleSendFriendRequest }) => {

    const { username, setName, available } = useIsUsernameAvailable()
    console.log(username, available)
    return (
        <>
            <Typography variant="h5">Lähetä kaveripyyntö</Typography>
            <form onSubmit={handleSendFriendRequest}>
                <TextField label="Nimi" variant="outlined" name="kaveri" size="small"
                    style={{ color: 'green' }}
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    error={(available === true)}
                    helperText={(available === true) ? 'Nimeä ei löydy' : ''}
                />
                {(available === 'loading' && <span style={{ marginLeft: 10 }}><CircularProgress /></span>)}
                <br /><Button disabled={(available !== false)} type="submit" variant="contained" size="large" color="primary" style={{ marginTop: '5px' }}>Lähetä</Button>
            </form>
        </>
    )
}
export default FriendRequestForm