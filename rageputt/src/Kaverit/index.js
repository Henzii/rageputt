import { useMutation, useQuery } from "@apollo/client"
import { ANSWER_FRIEND_REQUEST, GET_ME, SEND_FRIEND_REQUEST } from "../queries"
import FriendRequestForm from "./FriendRequestForm"
import FriendRequests from "./FriendRequests"
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Kaverit = () => {

    const mina = useQuery(GET_ME)

    const dispatch = useDispatch()


    const [ answerFriendRequest ] = useMutation( ANSWER_FRIEND_REQUEST, { refetchQueries: [{ query: GET_ME }] } )
    const [ sendFriendRequest ] = useMutation( SEND_FRIEND_REQUEST)

    const handleSendFriendRequest = (e) => {
        e.preventDefault()
        sendFriendRequest( { variables: { name: e.target.kaveri.value }} ).then(res => {
            dispatch( setNotification('Kaveripyyntö lähetetty!', 'success'))
        }).catch(e => {
            dispatch( setNotification('Pyyntö epäonnistui: ' + e.message, 'error'))
        })
        e.target.kaveri.value = ''
    }
    const handleFriendRequest = (friendId, answer) => {
        answerFriendRequest( { variables: { friendId, answer }}).then(res => {
            dispatch( setNotification('Kaveripyyntö hyväksytty', 'success'))
        }).catch(e => {
            dispatch( setNotification('Tapahtui virhe: ' + e.message, 'error' ))
        })
    }
    if (mina.loading) {
        return ( <h2>Loading friends...</h2>)
    }
    console.log(mina)
    return (
        <div>
        <h2>Kaverit</h2>
        <KaveriLista kaverit={mina.data.getMe.friends} />
        <FriendRequests pyynnot={mina.data.getMe.friendRequests} handleFriendRequest={handleFriendRequest} />
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