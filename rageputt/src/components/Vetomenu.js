import { ChevronLeft } from '@material-ui/icons';
import { Drawer, Divider, List, ListItem, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useStyles from '../hooks/useStyles';



const Vetomenu = ({ menuOpen, setMenuOpen }) => {

    const user = useSelector(state => state.user)
    const notLogged = (!user.user)
    const tyylit = useStyles()
    return (
            <Drawer
                open={menuOpen}
                variant="persistent"
                anchor="left"
            >   
                <IconButton onClick={() => setMenuOpen(false)}>
                    <ChevronLeft />
                </IconButton>
                <Divider className={tyylit.divider}/>
                <List>
                    <ListItem button component={Link} to="/" onClick={() => setMenuOpen(false)}>
                        Etusivu
                    </ListItem>
                <Divider className={tyylit.divider} />

                    <ListItem disabled={notLogged} button component={Link} to="/peli" onClick={() => setMenuOpen(false)}>
                        Uusi peli
                    </ListItem>
                <Divider className={tyylit.divider} />
                    <ListItem disabled={notLogged} button component={Link} to="/vanhat" onClick={() => setMenuOpen(false)}>
                        Vanhat pelit
                    </ListItem>
                    <ListItem disabled={notLogged} button component={Link} to="/stats" onClick={() => setMenuOpen(false)}>
                        Statistiikka
                    </ListItem>
                <Divider className={tyylit.divider} />
                    <ListItem disabled={notLogged} button component={Link} to="/kaverit" onClick={() => setMenuOpen(false)}>
                        Kaverit
                    </ListItem>
                <Divider className={tyylit.divider} />
                    <ListItem component={Link} to="/asetukset" disabled={notLogged} button onClick={() => setMenuOpen(false)}>
                        Asetukset
                    </ListItem>
                    <ListItem component={Link} to="/ohje" button onClick={() => setMenuOpen(false)}>
                        Ohje
                    </ListItem>
                    <Divider className={tyylit.divider} />

                    <ListItem button component={Link} to="/createUser" onClick={() => setMenuOpen(false)}>
                        Luo tunnus
                    </ListItem>
                    <ListItem button component={Link} to="/login" onClick={() => setMenuOpen(false)}>
                        Kirjaudu sisään
                    </ListItem>

                </List>
            </Drawer>
    )
}
export default Vetomenu;