import { ChevronLeft } from '@material-ui/icons';
import { Drawer, Divider, List, ListItem, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Vetomenu = ({ menuOpen, setMenuOpen }) => (
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
            <ListItem button component={Link} to="/peli" onClick={() => setMenuOpen(false)}>
                Uusi peli
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button component={Link} to="/vanhat" onClick={() => setMenuOpen(false)}>
                Vanhat pelit
            </ListItem>
            <ListItem button onClick={() => setMenuOpen(false)}>
                Statistiikka
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={() => setMenuOpen(false)}>
                Lisää kaveri
            </ListItem>
            <ListItem button onClick={() => setMenuOpen(false)}>
                Kaveripyynnöt
            </ListItem>

        </List>
        <List>
            <ListItem button onClick={() => setMenuOpen(false)}>
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
)
export default Vetomenu;