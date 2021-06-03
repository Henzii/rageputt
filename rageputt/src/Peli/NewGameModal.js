import { Button, Checkbox, Divider, FormControlLabel, InputLabel, makeStyles, Modal, Select } from "@material-ui/core"

const NewGameModal = ({ open, setModal }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setModal(false)}
            >
                <div className="newGameModal">
                    <h2>Uusi peli</h2>
                    <div>
                    <InputLabel htmlFor="age-native-simple">Pelimoodi</InputLabel>
                    <Select native>
                        <option value={0}>Normaali</option>
                    </Select>
                    </div>
                    <Divider/>
                    <div>
                    <h3>Pelaajat</h3>
                    <FormControlLabel control={<Checkbox name="pelaaja" checked />} label="Minä" />
                    <Button fullWidth variant="contained" color="primary">Aloita</Button>
                    <Button fullWidth onClick={() => setModal(false) } variant="contained" color="secondary" style={{ marginTop: '5px' }}>Kansel</Button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
export default NewGameModal