import { Paper } from '@material-ui/core'
import useStyles from '../hooks/useStyles'

const Page = (props) => {
    const tyylit = useStyles()
    return (
        <Paper className={tyylit.paper}>
            {props.children}
        </Paper>
    )
}
export default Page