import { createMuiTheme, rgbToHex } from "@material-ui/core"
import { lightGreen, red } from "@material-ui/core/colors";

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
        },
    },
    palette: {
        primary: {
            main: '#aed581',
        },
        secondary: red,
        action: {
            disabled: '#8F8F8F'
        },
        success: {
            main: 'rgba(76, 175, 80, 0.85)',
            
        },
        info: {
            main: 'rgba(33, 150, 243, 0.85)'
        }
    },
    overrides: {
        MuiAlert: {
            root: {
                borderRadius: 15,
            },
        },
        MuiCard: {
            root: {
                borderRadius: 15,
            }
        },
        MuiListItem: {
            root: {
                fontFamily: 'Quicksand',
            },
        },
        MuiButton: {
            root: {
                borderRadius: 10,
                fontFamily: 'Quicksand',
                height: 40
            },
        },
        MuiDivider: {
            root: {
                marginTop: 15,
                marginBottom: 15,
            }
        },
        MuiAppBar: {
            root: {
                borderRadius: 0
            },
        },
        MuiTextField: {
            root: {
                backgroundColor: '#ffffff',
            }
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: 15,
                backgroundColor: '#ffffff',

            },
        },
        MuiPaper: {
            root: {
                borderRadius: 15,
                padding: 10,
            },
        },
        MuiContainer: {
            root: {
                paddingBottom: 10,
                paddingTop: 10,
                maxWidth: 700,
            },
        },
    }
});
export default theme;