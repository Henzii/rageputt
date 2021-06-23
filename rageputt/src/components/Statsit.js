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
            Puttiprossa: {allStats.puttejaTotalSisaan/allStats.puttejaTotal*100}<br/><br/>
            5m: {allStats.puttejaSisaan[0]/allStats.putteja[0]*100}<br/>
            6m: {allStats.puttejaSisaan[1]/allStats.putteja[1]*100}<br/>
            7m: {allStats.puttejaSisaan[2]/allStats.putteja[2]*100}<br/>
            8m: {allStats.puttejaSisaan[3]/allStats.putteja[3]*100}<br/>
            9m: {allStats.puttejaSisaan[4]/allStats.putteja[4]*100}<br/>
            10m: {allStats.puttejaSisaan[5]/allStats.putteja[5]*100}<br/>
        </div>
    )
}

export default Statsit