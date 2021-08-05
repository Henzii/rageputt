import { killNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert, AlertTitle } from '@material-ui/lab/'
import { Slide, Zoom } from '@material-ui/core'

const Notification = () => {

    const dispatch = useDispatch();

    const notification = useSelector(state => state.notification)

    const handleClose = () => {
        dispatch(killNotification())
    }
    return (
        <Snackbar
            open={notification.alive}
            autoHideDuration={5000}
            onClose={handleClose}
            transitionDuration={{ enter: 1000, exit: 2000 }}
            TransitionProps={{ direction: 'left' }}
        >
            <Alert severity={notification.type} variant="filled" elevation={3} >
                {(notification.title !== '' && <AlertTitle>{notification.title}</AlertTitle>)}
                {notification.message}
            </Alert>
        </Snackbar>
    )
}
export default Notification