import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'

import Peli from './Peli';
import Notification from './components/Notification'

import Vetomenu from './components/Vetomenu'
import Statsit from './components/Statsit'
import LoginForm from './components/LoginForm'
import Kaverit from './Kaverit'
import Asetukset from './components/Asetukset'

import { AppBar, Toolbar, IconButton, Typography, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CreateUserForm from './components/CreateUserForm';
import VanhatPelit from './VanhatPelit';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ME } from './queries';
import { useLazyQuery } from '@apollo/client';
import { setUser } from './reducers/userReducer';


function App() {

  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [getMe, gotme] = useLazyQuery(GET_ME)

  const openMenu = () => {
    setMenuOpen(true)
  }
  useEffect(() => {
    const otaToken = () => {
      const token = localStorage.getItem('rageToken')
      console.log(token)
      console.log(user)
      if (token && !user.user) {
        if (!gotme.loading && gotme.data) {
          console.log(gotme)
          dispatch( setUser(gotme.data.getMe.name, gotme.data.getMe.user))
        }
        else if (gotme.called === false) {
          getMe()
        }
      }
    }
    otaToken()
  }, [gotme])
  return (
    <div>

      <YlaMenu openMenu={openMenu} />

      <Vetomenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Notification />
      <Container>
        <Switch>
          <Route path="/kaverit">
            <Kaverit />
          </Route>
          <Route path="/login" >
            <LoginForm />
          </Route>
          <Route path="/vanhat" >
            <VanhatPelit />
          </Route>
          <Route path="/peli">
            <Peli />
          </Route>
          <Route path="/stats">
            <Statsit />
          </Route>
          <Route path="/createUser">
            <CreateUserForm />
          </Route>
          <Route path="/asetukset">
            <Asetukset />
          </Route>
          <Route path="/">
            <h1>Etusivu</h1>
            <p>
              Rageputt is bäk
            </p>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

const YlaMenu = ({ openMenu }) => {
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

export default App;
