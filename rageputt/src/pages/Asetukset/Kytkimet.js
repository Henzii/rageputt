import { Divider, Grid, Switch, Typography } from "@material-ui/core";

const Kytkimet = ({ me, handleChangeSettings }) => {
    return (
        <div>
        <Grid container justify="space-between" direction="row" alignItems="center">
            <Grid item xs={8} component={Typography} >
                Salli kavereiden nähdä tilastoni
            </Grid>
            <Grid item style={{ paddingRight: 10 }}>
                <Switch color="primary" checked={(me?.shareStats)} onChange={() => handleChangeSettings({ shareStats: !me.shareStats })} />
            </Grid>
        </Grid>
        <Divider />
        <Grid container justify="space-between" direction="row" alignItems="center">
            <Grid item xs={8} component={Typography} >
                Estä kaikki kaveripyynnöt
            </Grid>
            <Grid item style={{ paddingRight: 10 }}>
                <Switch color="primary" checked={(me?.ignoreFriendRequests)} onChange={() => handleChangeSettings({ ignoreFriendRequests: !me.ignoreFriendRequests })} />
            </Grid>
        </Grid>
        </div>
    )

}
export default Kytkimet;