import { ArgumentAxis, ValueAxis, LineSeries, Chart, Title } from '@devexpress/dx-react-chart-material-ui'
import { Backdrop, CircularProgress, Grid, Container, Typography, Paper } from '@material-ui/core'

import { laskePisteet, tulokset2ChartData } from '../../utils/stuff'
import BarChart from '../../components/BarChart'
import { Animation } from '@devexpress/dx-react-chart'
import DropDown from '../../components/DropDown'
import useGetMe from '../../hooks/useGetMe'
import useGetGames from '../../hooks/useGetGames'

const Statsit = () => {

    const { games, setUserId, userId } = useGetGames();
    const { me } = useGetMe()

    if (games === null || me === null) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        )
    }

    let kaikkiPuttiProssat = tulokset2ChartData()
    let kaikkiPisteet = []
    let maxPisteet = 0
    for (let i = 0; i < games.length; i++) {

        if (!games[i].finished) continue    // Ei lasketa keskeneräisiä pelejä mukaan
        const player = games[i].players.find(p => p.user.id === (userId) ? userId : me.id )
        kaikkiPuttiProssat = tulokset2ChartData(player.tulokset, kaikkiPuttiProssat)
        const pisteet = laskePisteet(player.tulokset)
        if (pisteet > maxPisteet) maxPisteet = pisteet
        kaikkiPisteet.push({ game: i, score: pisteet })
    }
    const kaveritMap = new Map()
    kaveritMap.set('Minä', me.id)
    for (const kaveri of me.friends)
        kaveritMap.set(kaveri.name, kaveri.id)
    console.log('Data from ' + userId);
    return (
        <Container>
            <Typography variant="h5">
                Pelaaja: <DropDown
                    options={kaveritMap}
                    mappedOptions={true}
                    onChange={(v) => setUserId(v)}
                />
            </Typography>
            <Grid container direction="column">
                <Grid item component={Typography}>
                    Pelejä: {games.length}
                </Grid>
                <Grid item component={Typography}>
                    Paras tulos: {maxPisteet}
                </Grid>
            </Grid>
            <BarChart data={kaikkiPuttiProssat} otsikko="Puttiprossat" paperStyle />
            <Paper style={{ borderRadius: 15}}>
                <Chart data={kaikkiPisteet} height='200'>
                    <Title text="Pisteet" />
                    <ArgumentAxis />
                    <ValueAxis />
                    <LineSeries
                        argumentField="game"
                        valueField="score"
                    />
                    
                </Chart>
            </Paper>
        </Container>
    )
}

export default Statsit