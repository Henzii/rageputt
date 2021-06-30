import { statistiikat, tulokset2ChartData } from "../../utils/stuff"

import BarChart from '../../components/BarChart'

const PlayerStats = ({ player }) => {

    const statsit = tulokset2ChartData(player.tulokset)
    return (
        <div>
            <BarChart data={statsit} />
        </div>
    )
}
export default PlayerStats