import { Paper } from '@material-ui/core'
import { ValueAxis, Chart, Title, BarSeries, ArgumentAxis } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import useStyles from '../hooks/useStyles'

const BarChart = ({ data, otsikko='', paperStyle=false, paperProps=null } ) => {
    const tyyli = useStyles()
    return (
        <Paper className={(paperStyle === true) ? tyyli.paper : null}>
            <Chart data={data} height='250'>
                <Title text={otsikko} />
                <ArgumentAxis />
                <ValueAxis min={0} max={100} />
                <BarSeries
                    argumentField="dist"
                    valueField="prossa"
                    
                />
                <Animation />
            </Chart>
        </Paper>
    )

}
export default BarChart