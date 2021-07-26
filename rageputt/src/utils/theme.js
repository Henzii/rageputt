import { createMuiTheme } from "@material-ui/core"
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme( {
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
        fontWeightBold: 700,
        h3: {
            marginBottom: 15,
        },
        h4: {
            marginBottom: 15,
        },
        h5: {
            marginBottom: 15
        }
    },
    palette: {
        secondary: red
    }
});
export default theme;