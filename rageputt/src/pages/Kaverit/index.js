import { useMutation, useQuery } from "@apollo/client"
import FriendRequestForm from "./FriendRequestForm"
import FriendRequests from "./FriendRequests"
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

import { Container, Divider, Typography } from '@material-ui/core'

import { ANSWER_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from "../../graphql/mutations"
import { GET_ME } from '../../graphql/queries';

import useGetMe from "../../hooks/useGetMe"

const Kaverit = () => {

    const { me, loading, refetch } = useGetMe();

    const dispatch = useDispatch()


    const [answerFriendRequest] = useMutation(ANSWER_FRIEND_REQUEST, { refetchQueries: [{ query: GET_ME }] })
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST)

    const handleSendFriendRequest = (e) => {
        e.preventDefault()
        sendFriendRequest({ variables: { name: e.target.kaveri.value } }).then(res => {
            dispatch(setNotification('Kaveripyyntö lähetetty!', 'success'))
        }).catch(e => {
            dispatch(setNotification('Pyyntö epäonnistui: ' + e.message, 'error'))
        })
        e.target.kaveri.value = ''
    }
    const handleFriendRequest = (friendId, answer) => {
        answerFriendRequest({ variables: { friendId, answer } }).then(res => {
            dispatch(setNotification('Kaveripyyntö hyväksytty', 'success'))
        }).catch(e => {
            dispatch(setNotification('Tapahtui virhe: ' + e.message, 'error'))
        })
    }
    const refetchMe = () => {
        refetch();
    }
    if (loading || !me) {
        return (<h2>Loading friends...</h2>)
    }
    console.log(me)
    return (
        <Container>
            <Typography variant="h4">Kaverit</Typography>
            <KaveriLista kaverit={me.friends} />
            <Divider />
            <FriendRequests pyynnot={me.friendRequests} handleFriendRequest={handleFriendRequest} refetchMe={refetchMe} />
            <Divider />
            <FriendRequestForm handleSendFriendRequest={handleSendFriendRequest} />
        </Container>
    )

}
const KaveriLista = ({ kaverit }) => {
    if (kaverit.length < 1) {
        return (<div>Ei kavereita :(</div>)
    }
    return (
        <div> {kaverit.map(k => <li key={k.id}>{k.user} ({k.name})</li>)}</div>
    )
}
export default Kaverit