import { IconButton, Paper, Typography, Grid, List, ListItem } from '@material-ui/core'
import { Cancel, Check } from '@material-ui/icons/'
import useStyles from '../../hooks/useStyles'

const FriendRequests = ({ pyynnot, handleFriendRequest }) => {
    return (
        <>
            <Typography variant="h5">Kaveripyynnöt</Typography>
            <List dense={true}>
                {pyynnot.map(k => <KaveriKortti handleFriendRequest={handleFriendRequest} kaveri={k} key={k.id} />)}
            </List>
        </>
    )
}
const KaveriKortti = ({ kaveri, handleFriendRequest }) => {
    const tyylit = useStyles()
    return (
        <ListItem>
            <Grid container component={Paper} elevation={3}  className={tyylit.listPaper} justify="space-between" alignItems="center">
                <Grid item xs={8}>
                    {kaveri.user} ({kaveri.name})
                </Grid>
                <Grid item>
                    <IconButton onClick={() => handleFriendRequest(kaveri.id, true)}>
                        <Check style={{ color: 'green' }} />
                    </IconButton>
                    <IconButton onClick={() => handleFriendRequest(kaveri.id, false)}>
                        <Cancel style={{ color: '#ff4040' }} />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    )
}
export default FriendRequests