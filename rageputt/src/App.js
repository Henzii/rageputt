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

import { GET_ME } from './graphql/queries';
import { useLazyQuery } from '@apollo/client';

import useGetMe from './hooks/useGetMe';


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
        dispatch( setUser( me.name, me.user ))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me] )

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
