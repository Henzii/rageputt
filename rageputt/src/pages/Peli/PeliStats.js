import { tulokset2ChartData } from "../../utils/stuff"

import BarChart from '../../components/BarChart'

const PeliStats = ({ player }) => {

    const statsit = tulokset2ChartData(player.tulokset)
    console.log(player.tulokset)
    const puttiprossa = (player.tulokset.reduce((p, c) => p + c, 0) / (player.tulokset.length*5) * 100).toFixed()
    return (
        <>
            Puttiprossa: {isNaN(puttiprossa) ? '--' : puttiprossa }
            <BarChart data={statsit} otsikko={player.user.name} paperProps={{
                elevation: 3,
                style: { marginBottom: '5px' }
            }} />
        </>
    )
}
export default PeliStats