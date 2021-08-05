import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useState } from 'react'
import { useHistory } from 'react-router'

const YlaPalkki = ({ openMenu }) => {

  const historia = useHistory()
  const [klik, setKlik] = useState(0)
  const [resetId, setResetId] = useState(null)
  const handleClick = () => {
    setKlik(klik + 1)
      if (resetId !== null) clearTimeout(resetId)
    if (klik > 10) historia.push('/dev')
    setResetId(
      setTimeout(() => {
        setKlik(0)
      }, 500)
    )
  }
  console.log(klik)
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" onClick={openMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" style={{ flexGrow: 1, marginBottom: 0 }} onClick={handleClick}>
          RagePutt
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default YlaPalkki