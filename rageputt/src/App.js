import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Notification from './components/Notification'
import Vetomenu from './components/Vetomenu'
import YlaPalkki from './components/YlaPalkki';

import Peli from './pages/Peli';
import Statsit from './pages/Statsit'
import LoginForm from './components/LoginForm'
import Kaverit from './pages/Kaverit'
import Asetukset from './pages/Asetukset'
import CreateUserForm from './pages/CreateUser';
import VanhatPelit from './pages/VanhatPelit';
import Etusivu from './pages/Etusivu'



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

      <YlaPalkki openMenu={openMenu} />
      <Vetomenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Notification />
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
           <Etusivu />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
