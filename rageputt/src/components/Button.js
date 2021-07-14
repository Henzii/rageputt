import { Button as Nbutton } from '@material-ui/core'

const Button = ({ children, variant="contained", color="primary", ...props }) => {
    const style = {
        margin: '7px 0px',
    }
    return <Nbutton {...props} variant={variant} color={color} style={style}>{children}</Nbutton>
}

export default Button;