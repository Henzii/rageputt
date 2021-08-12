import { useMutation } from "@apollo/client";
import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import YesNoModal from "../../components/YesNoModal";
import { DELETE_FRIEND } from "../../graphql/mutations";
import { setNotification } from "../../reducers/notificationReducer";

const PoistaKaveri = ({me, refetch}) => {

    const [vahvistus, setVahvistus] = useState(false);
    const [kaveri, setKaveri] = useState('');
    const dispatch = useDispatch();

    const [ mutaatti ] = useMutation(DELETE_FRIEND)

    const handleKillFriend = async () => {
        const kId = me.friends.find(k => k.user === kaveri)
        if (!kId) {
            dispatch( setNotification('Kaveri ei ole listoillasi', 'error', 'Does not compute'))
        } else {
            console.log('Kill ' + kId.id)
            try {
                await mutaatti( { variables: { userId: kId.id }})
                dispatch( setNotification('Huono ystävä poistettu', 'success', 'Kaveri poistettu'))
                await refetch();
            } catch (e) {
                dispatch( setNotification('Palvelin palautti virheen', 'error', 'Virhe kaverin poistossa'))
            }
        }
        setVahvistus(false)
        setKaveri('')
    }
    return (
        <>
        <Typography variant="h5">Poista kaveri</Typography>
        <TextField variant="outlined" value={kaveri} onChange={(e) => setKaveri(e.target.value.toLowerCase())} size="small" placeholder="Kaverin tunnus..."/>&nbsp;
        <Button variant="contained" color="primary" 
            onClick={() => setVahvistus(true)}
            disabled={!me.friends.find(k=>k.user === kaveri)}
        >Poista</Button>
        <YesNoModal open={vahvistus} 
            title="Vahvista poisto"
            text={`Haluatko varmasti poistaa kverin ${kaveri}`}
            onNoClick={() => setVahvistus(false)}
            onYesClick={handleKillFriend}
        />
        </>
    )
}
export default PoistaKaveri;