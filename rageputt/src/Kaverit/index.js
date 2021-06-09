import { useQuery } from "@apollo/client"
import { GET_ME } from "../queries"
import FriendRequestForm from "./FriendRequestForm"
import FriendRequests from "./FriendRequests"

const Kaverit = () => {

    const mina = useQuery(GET_ME)
    const handleSendFriendRequest = (e) => {
        e.preventDefault()
        console.log('Jee, kavereita!')
    }
    if (mina.loading) {
        return ( <h2>Loading friends...</h2>)
    }
    console.log(mina)
    return (
        <div>
        <h2>Kaverit</h2>
        <KaveriLista kaverit={mina.data.getMe.friends} />
        <FriendRequests pyynnot={mina.data.getMe.friendRequests} />
        <FriendRequestForm handleSendFriendRequest={handleSendFriendRequest} />
        </div>
    )

}
const KaveriLista = ({ kaverit }) => {
    if (kaverit.length < 1) {
        return (<div>Ei kavereita :(</div>)
    }
    return (
        <div>{kaverit.map(k => k.user)}</div>
    )
}
export default Kaverit