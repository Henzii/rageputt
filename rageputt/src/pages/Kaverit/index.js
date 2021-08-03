import { useMutation } from "@apollo/client"
import FriendRequestForm from "./FriendRequestForm"
import FriendRequests from "./FriendRequests"
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

import { CircularProgress, Container, Divider, Typography, Button } from '@material-ui/core'

import { ANSWER_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from "../../graphql/mutations"
import { GET_ME } from '../../graphql/queries';

import KaveriLista from "./KaveriLista"

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
        return (<CircularProgress />)
    }
    return (
        <Container>
            <Typography variant="h4">Kaverit</Typography>
            <KaveriLista kaverit={me.friends} />
            <Divider />
            <FriendRequestForm handleSendFriendRequest={handleSendFriendRequest} />
            <Divider />
            {(me.friendRequests.legth > 0 && <FriendRequests pyynnot={me.friendRequests} handleFriendRequest={handleFriendRequest} refetchMe={refetchMe} />)}
            <Button fullWidth variant="outlined" onClick={refetchMe}>Päivitä kaveripyynnöt</Button>

        </Container>
    )

}

export default Kaverit