import { Paper } from '@material-ui/core'
import { ValueAxis, Chart, Title, BarSeries, ArgumentAxis } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'

const BarChart = ({ data }) => {
    console.log(data)
    return (
        <Paper>
            <h2>Chart!!!</h2>
            <Chart data={data} height='300'>
                <Title text="BaariDataa" />
                <ArgumentAxis />
                <ValueAxis 
                    min={100}
                    showGrid={true}
                />
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