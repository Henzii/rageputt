import { useMutation } from "@apollo/client"
import FriendRequestForm from "./FriendRequestForm"
import FriendRequests from "./FriendRequests"
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'

import { CircularProgress, Container, Divider, Typography, Button, TextField } from '@material-ui/core'

import { ANSWER_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from "../../graphql/mutations"

import KaveriLista from "./KaveriLista"

import useGetMe from "../../hooks/useGetMe"
import PoistaKaveri from "./PoistaKaveri"

const Kaverit = () => {

    const { me, loading, refetch, updateCache } = useGetMe();

    const dispatch = useDispatch()

    const [answerFriendRequest] = useMutation(ANSWER_FRIEND_REQUEST)
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST)

    const handleSendFriendRequest = (e) => {
        e.preventDefault()
        sendFriendRequest({ variables: { name: e.target.kaveri.value } }).then(res => {
            dispatch(setNotification('Kaveripyyntö lähetetty!', 'success'))
            e.target.kaveri.value = ''
        }).catch(e => {
            dispatch(setNotification('Pyyntö epäonnistui: ' + e.message, 'error'))
        })
    }
    const handleFriendRequest = async (friendId, answer) => {
        try {
            const res = await answerFriendRequest({ variables: { friendId, answer } })
            updateCache(res.data.handleFriendRequest)
            dispatch(setNotification('Kaveripyyntö käsitelty', 'success'))

        } catch(e) {
            console.log(e)
            dispatch(setNotification('Tapahtui virhe: ' + e.message, 'error'))

        }
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
            {(me.friendRequests.length > 0 && <FriendRequests pyynnot={me.friendRequests} handleFriendRequest={handleFriendRequest} />)}
            <Divider />
            <PoistaKaveri me={me} refetch={refetch} />
            <Divider />
            <Button fullWidth variant="outlined" onClick={refetchMe}>Päivitä kaveripyynnöt</Button>

        </Container>
    )

}

export default Kaverit