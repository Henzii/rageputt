import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'

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

import { setUser } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

import useGetMe from './hooks/useGetMe';
import RestoreAccount from './components/RestoreAccount';
import DevPage from './components/DevPage';
import Ohje from './pages/Ohje';

import Palaute from './components/Palaute';


function App() {

  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const { me, loading } = useGetMe();

  const openMenu = () => {
    setMenuOpen(true)
  }
  useEffect(() => {
    if (!loading && me != null && !user.user) {
      dispatch(setUser(me.name, me.user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me])

  return (
    <>
      <div id="AppBar">
        <YlaPalkki openMenu={openMenu} />
        <Vetomenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Notification />
      </div>
      <div id="AppContent">
        <Switch>
          <Route path="/kaverit">
            <Kaverit />
          </Route>
          <Route path="/palaute">
            <Palaute />
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
          <Route path="/dev">
            <DevPage />
          </Route>
          <Route path="/createUser">
            <CreateUserForm />
          </Route>
          <Route path="/asetukset">
            <Asetukset />
          </Route>
          <Route path="/palautus">
            <RestoreAccount />
          </Route>
          <Route path="/ohje">
            <Ohje />
          </Route>
          <Route path="/">
            <Etusivu />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
