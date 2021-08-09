import { Typography, Paper, List, ListItem, Fade } from "@material-ui/core"
import { useState } from "react"

const KaveriLista = ({ kaverit }) => {
    return (
        <>
            <Typography variant="h6">Sinulla on {kaverit.length} kaveria</Typography>
            <List dense={true}>
                {kaverit.map(k => <Kaveri key={k.user} kaveri={k} />)}
            </List>
        </>
    )
}
const Kaveri = ({ kaveri }) => {
    return (
        <ListItem>
            <Paper elevation={3}>
                <strong>{kaveri.name}</strong> ({kaveri.user})
            </Paper>
        </ListItem>
    )
}
export default KaveriLista