
import { ListItem } from "@material-ui/core";
import useStyles from "../hooks/useStyles";

export const VetomenuListItem = ({...props}) => {
    
    const tyylit = useStyles();
    
    return (
        <ListItem {...props} className={tyylit.vetoMenuListItem} />
    );
}
export default VetomenuListItem;