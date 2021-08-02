import { useQuery } from '@apollo/client'
import { ArgumentAxis, ValueAxis, LineSeries, Chart, Title } from '@devexpress/dx-react-chart-material-ui'
import { Backdrop, CircularProgress, Paper, Grid, Container, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { GET_GAMES } from '../../graphql/queries'
import { laskePisteet, tulokset2ChartData } from '../../utils/stuff'
import BarChart from '../../components/BarChart'
import { Animation } from '@devexpress/dx-react-chart'
import DropDown from '../../components/DropDown'


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
    let kaikkiPuttiProssat = tulokset2ChartData()
    let kaikkiPisteet = []
    let maxPisteet = 0
    for (let i = 0; i < statsData.length; i++) {
        
        if (!statsData[i].finished) continue    // Ei lasketa keskeneräisiä pelejä mukaan

        const player = statsData[i].players.find(p => p.user.user === user.user)
        kaikkiPuttiProssat = tulokset2ChartData(player.tulokset, kaikkiPuttiProssat)
        const pisteet = laskePisteet(player.tulokset)
        if (pisteet > maxPisteet) maxPisteet = pisteet
        kaikkiPisteet.push({ game: i, score: pisteet })
    }

    return (
        <Container>
                <Typography variant="h5">
                    Pelaaja: <DropDown 
                                options={new Map().set('Eka', 1).set('Toka', 2) } 
                                mappedOptions={true} 
                                onChange={(v) => console.log(v)}
                            />
                </Typography>
                <Grid container direction="column">
                    <Grid item component={Typography}>
                        Pelejä: {statsData.length}
                    </Grid>
                    <Grid item component={Typography}>
                        Paras tulos: {maxPisteet}
                    </Grid>
                </Grid>
            <BarChart data={kaikkiPuttiProssat} otsikko="Puttiprossat" />

            <Chart data={kaikkiPisteet} height='200'>
                <Title text="Pisteet" />
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries
                    argumentField="game"
                    valueField="score"
                />
                <Animation />
            </Chart>

        </Container>
    )
}

export default Statsit