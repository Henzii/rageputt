import { useQuery } from "@apollo/client"
import { Button, Checkbox, Divider, FormControlLabel, InputLabel, List, ListItem, Modal, Select } from "@material-ui/core"
import { useState } from "react"

import { GET_ME } from "../../graphql/queries"

const NewGameModal = ({ open, setModal, handleNewGame }) => {

    const mina = useQuery( GET_ME )
    const [ pelaajat, setPelaajat ] = useState([])

    if (mina.loading) {
        return (
            <h2>Loading stuff...</h2>
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleNewGame( pelaajat )
    }
    const handleClick = (pelaaja) => {
        if (pelaajat.includes(pelaaja.id)) {
            setPelaajat( pelaajat.filter( p => p !== pelaaja.id ))
        } else {
            setPelaajat( [...pelaajat, pelaaja.id] )
        }

    }
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setModal(false)}
            >
                <div className="newGameModal">
                    <form onSubmit={handleSubmit}>
                        <h2>Uusi peli</h2>
                        <div>
                            <InputLabel htmlFor="age-native-simple">Pelimoodi</InputLabel>
                            <Select native>
                                <option value={0}>Normaali</option>
                            </Select>
                        </div>
                        <Divider />
                        <div>
                            <h3>Pelaajat</h3>
                            <List>
                            <ListItem>
                                <FormControlLabel control={<Checkbox checked />} label="Minä" />
                            </ListItem>
                            <Kaverivalinta kaverit={mina.data.getMe.friends} handleClick={handleClick} />
                            </List>
                            <Button fullWidth variant="contained" color="primary" type="submit">Aloita</Button>
                            <Button fullWidth onClick={() => setModal(false)} variant="contained" color="secondary" style={{ marginTop: '5px' }}>Kansel</Button>
                        </div>
                    </form>
                </div>

            </Modal>
        </div>
    )
}

const Kaverivalinta = ({ kaverit, handleClick }) => {
    return (
        kaverit.map(k => <ListItem key={k.id}><FormControlLabel control={<Checkbox onChange={() => handleClick(k)} />} label={k.user} /></ListItem>)
    )
}

export default NewGameModal