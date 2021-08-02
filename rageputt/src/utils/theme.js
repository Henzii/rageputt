import { createMuiTheme } from "@material-ui/core"
import { red, green, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
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
        primary: {
            main: '#aed581',
        },
        secondary: red,
        action: {
            disabled: '#2F2F2F'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 10,
                fontFamily: 'Quicksand',
                height: 40
            },
        },
        MuiAppBar: {
            root: {
                borderRadius: 0
            }
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: 15
            }
        },
        MuiPaper: {
            root: {
                borderRadius: 15
            }
        },
        MuiContainer: {
            root: {
                paddingBottom: 10
            }
        },
    }
});
export default theme;