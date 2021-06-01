import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'

import Peli from './Peli';
import Notification from './components/Notification'

import Vetomenu from './components/Vetomenu'
import LoginForm from './components/LoginForm'

import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CreateUserForm from './components/CreateUserForm';

function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = () => {
    setMenuOpen(true)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RagePutt
          </Typography>
          <Button>
            Login
          </Button>

        </Toolbar>
      </AppBar>
      <Vetomenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Notification />
      <Container>
      <Switch>
        <Route path="/login" >
          <LoginForm />
        </Route>
        <Route path="/peli">
          <Peli />
        </Route>
        <Route path="/createUser">
          <CreateUserForm />
        </Route>
        <Route path="/">
          <h1>Etusivu</h1>
        </Route>
      </Switch>
      </Container>
    </div>
  );
}

export default App;
