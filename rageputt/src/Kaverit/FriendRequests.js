import { Cancel, Check } from '@material-ui/icons/'

const FriendRequests = ({ pyynnot }) => {
    return (
        <>
        <h2>Kaveripyynnöt</h2>
        {pyynnot.map(k => <KaveriKortti kaveri={k} />)}
        </>
    )
}
const KaveriKortti = ({ kaveri }) => {
    return (
        <div>
            {kaveri.user} | {kaveri.name} <Check style={{color: 'green' }} /> <Cancel color="secondary" /> 
        </div>
    )
}
export default FriendRequests