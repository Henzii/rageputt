import { tulokset2ChartData } from "../../utils/stuff"

import BarChart from '../../components/BarChart'

const PlayerStats = ({ player }) => {

    const statsit = tulokset2ChartData(player.tulokset)
    return (
            <BarChart data={statsit} otsikko={player.user.name} paperProps={ {
                elevation: 3,
                style: { marginBottom: '5px' }
            }} />
    )
}
export default PlayerStats