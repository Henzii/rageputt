import { useMutation } from "@apollo/client"
import { ListItem, List, Button, TextField, Divider } from "@material-ui/core"
import { CREATE_USER } from '../queries'

const CreateUserForm = () => {

    const [ createUser ] = useMutation(CREATE_USER)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vars = {
            user: e.target.user.value,
            password: e.target.password.value,
            name: e.target.name.value,
            email: e.target.email.value
        }
        try {
            const res = await createUser({ variables: vars })
            console.log('OK', res.data.createUser)
        } catch (e) {
            console.log('Error = ', e.message)
        }
    }

    return (
        <div>
            <h1>Luo tunnus</h1>
            <h2>Perustiedot</h2>
            <form onSubmit={handleSubmit}>
                <List>
                <ListItem><TextField name="user" label="Tunnus" variant="outlined" fullWidth></TextField></ListItem>
                <ListItem><TextField name="password" type="password" label="Salasana" variant="outlined" fullWidth></TextField></ListItem>
                <ListItem><TextField label="Salasana uudestaan" variant="outlined" fullWidth></TextField></ListItem>
                <Divider />
            <h2>Turhat tiedot</h2>
                <ListItem><TextField name="name" label="Nimi" variant="outlined" fullWidth></TextField></ListItem>
                <ListItem><TextField name="email" label="Sähköposti" variant="outlined" fullWidth></TextField></ListItem>
                <ListItem><Button type="submit" variant="contained" fullWidth color="primary">Luo tunnus</Button></ListItem>
                </List>
            </form>
        </div>
    )
}

export default CreateUserForm