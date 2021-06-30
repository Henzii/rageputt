import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const YlaPalkki = ({ openMenu }) => {
    return (
        <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RagePutt
          </Typography>
        </Toolbar>
      </AppBar>
      )
}
export default YlaPalkki