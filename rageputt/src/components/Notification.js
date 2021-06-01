import { killNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const Notification = () => {

    const dispatch = useDispatch();

    const notification = useSelector(state => state.notification)

    const handleClose = () => {
        dispatch(killNotification())
    }
    return (
        <div>
            <Snackbar open={notification.alive} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity={notification.type} variant="filled">
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default Notification