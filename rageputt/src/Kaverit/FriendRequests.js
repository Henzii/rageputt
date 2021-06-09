import { IconButton, Paper } from '@material-ui/core'
import { Cancel, Check } from '@material-ui/icons/'

const FriendRequests = ({ pyynnot, handleFriendRequest }) => {
    if (pyynnot.length < 1) {
        return (
            <h3>Ei kaveripyyntöjä</h3>
        )
    }
    return (
        <>
            <h2>Kaveripyynnöt</h2>
            {pyynnot.map(k => <KaveriKortti handleFriendRequest={handleFriendRequest} kaveri={k} key={k.id} />)}
        </>
    )
}
const KaveriKortti = ({ kaveri, handleFriendRequest }) => {
    return (
        <Paper elevation={2} style={{ paddingLeft: '5px', display: 'inline-block', width: '100%'}}>
            <div style={{float: 'left', paddingTop: '10px', fontWeight: 'bold' }}>
               {kaveri.user} ({kaveri.name})
            </div>
            <div style={{float: 'right' }}>
                <IconButton onClick={() => handleFriendRequest(kaveri.id, true )}>
                    <Check style={{ color: 'green' }} />
                </IconButton>
                <IconButton onClick={() => handleFriendRequest(kaveri.id, false )}>
                    <Cancel style={{ color: 'red' }} />
                </IconButton>
            </div>

        </Paper>
    )
}
export default FriendRequests