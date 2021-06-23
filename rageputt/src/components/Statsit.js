import { useQuery } from '@apollo/client'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { GET_GAMES } from '../queries'
import { mergeStatsit, statistiikat } from '../utils/stuff'

const Statsit = () => {

    const statsRawData = useQuery(GET_GAMES)
    const user = useSelector(state => state.user)

    if (statsRawData.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }
    const statsData = statsRawData.data.getGames
    let allStats = null
    for(let i = 0; i < statsData.length; i++ ) {
        const player = statsData[i].players.find(p => p.user.user === user.user)
        allStats = mergeStatsit( statistiikat(player.tulokset), allStats )
    }
    console.log(allStats)
    return (
        <div>
            <h2>Statsit</h2>
        </div>
    )
}

export default Statsit