import { Button, TextField, Typography } from '@material-ui/core'

const FriendRequestForm = ({ handleSendFriendRequest }) => {
    return (
        <>
            <Typography variant="h5">Lähetä kaveripyyntö</Typography>
            <form onSubmit={handleSendFriendRequest}>
                <TextField label="Nimi" variant="outlined" fullWidth name="kaveri" size="small" />
                <Button type="submit" variant="contained" fullWidth size="large" color="primary" style={{ marginTop: '5px' }}>Lähetä</Button>
            </form>
        </>
    )
}
export default FriendRequestForm