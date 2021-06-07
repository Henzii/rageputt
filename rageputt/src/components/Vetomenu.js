import { ChevronLeft } from '@material-ui/icons';
import { Drawer, Divider, List, ListItem, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Vetomenu = ({ menuOpen, setMenuOpen }) =>  {
    
    const user = useSelector(state => state.user)
    const notLogged = (!user.user)
    return (
    <Drawer
        open={menuOpen}
        variant="persistent"
        anchor="left"
    >
        <IconButton onClick={() => setMenuOpen(false)}>
            <ChevronLeft />
        </IconButton>
        <Divider />
        <List>
            <ListItem button component={Link} to="/" onClick={() => setMenuOpen(false)}>
                Etusivu
            </ListItem>
        </List>
        <Divider />

        <List>
            <ListItem disabled={notLogged} button component={Link} to="/peli" onClick={() => setMenuOpen(false)}>
                Uusi peli
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disabled={notLogged} button component={Link} to="/vanhat" onClick={() => setMenuOpen(false)}>
                Vanhat pelit
            </ListItem>
            <ListItem disabled={notLogged} button onClick={() => setMenuOpen(false)}>
                Statistiikka
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disabled={notLogged} button onClick={() => setMenuOpen(false)}>
                Lisää kaveri
            </ListItem>
            <ListItem disabled={notLogged} button onClick={() => setMenuOpen(false)}>
                Kaveripyynnöt
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disabled={notLogged} button onClick={() => setMenuOpen(false)}>
                Asetukset
            </ListItem>
            <ListItem button component={Link} to="/createUser" onClick={() => setMenuOpen(false)}>
                Luo tunnus
            </ListItem>
            <ListItem button component={Link} to="/login" onClick={() => setMenuOpen(false)}>
                Kirjaudu sisään
            </ListItem>

        </List>
    </Drawer>
)}
export default Vetomenu;