const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles( {
    paper: {
        padding: 5,
        paddingLeft: 15,
        marginBottom: 20,
        borderRadius: 15
    },
    listPaper: {
        borderRadius: 10,
    },
    dialogi: {
        padding: 50,
    },
    divider: {
        margin: 0,
    }
});
export default useStyles;