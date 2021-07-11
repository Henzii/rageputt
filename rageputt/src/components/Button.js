import { Button as Nbutton } from '@material-ui/core'

const Button = ({ children, variant="contained", color="primary", ...props }) => {
    return <Nbutton {...props} variant={variant} color={color}>{children}</Nbutton>
}

export default Button;