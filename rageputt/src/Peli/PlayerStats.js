import { statistiikat } from "../utils/stuff"

const PlayerStats = ({ player }) => {

    const statsit = statistiikat(player.tulokset)
    return (
        <div>
            Puttiprossa: { statsit.puttejaTotalSisaan / statsit.puttejaTotal * 100} %<br/><br/>
            5m: {statsit.puttejaSisaan[0]} / {statsit.putteja[0]} <br/>
            6m: {statsit.puttejaSisaan[1]} / {statsit.putteja[1]}<br/>
            7m: {statsit.puttejaSisaan[2]} / {statsit.putteja[2]}<br/>
            8m: {statsit.puttejaSisaan[3]} / {statsit.putteja[3]}<br/>
            9m: {statsit.puttejaSisaan[4]} / {statsit.putteja[4]}<br/>
            10m: {statsit.puttejaSisaan[5]} / {statsit.putteja[5]}
        </div>
    )
}
export default PlayerStats