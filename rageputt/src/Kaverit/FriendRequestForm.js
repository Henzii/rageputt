import { Button, TextField } from '@material-ui/core'

const FriendRequestForm = ({ handleSendFriendRequest }) => {
    return (
        <>
        <h2>Lähetä kaveripyyntö</h2>
        <form onSubmit={handleSendFriendRequest}>
        <TextField label="Nimi" variant="outlined" fullWidth/>
        <Button type="submit" variant="contained" fullWidth size="large" color="primary" style={{marginTop: '5px'}}>Lähetä</Button>
        </form>
        </>
    )
}
export default FriendRequestForm