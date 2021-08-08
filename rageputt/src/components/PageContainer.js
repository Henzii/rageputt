import { Container, Button, Fade } from "@material-ui/core"
import { SchemaMetaFieldDef } from "graphql";
import { useEffect, useState } from "react"

const PageContainer = (props) => {

    const [sivu, setSivu] = useState(0)
    const handleClick = (dir) => {
        if (sivu + dir >= 0 && sivu + dir < props.children.length)
            setSivu(sivu + dir)
    }
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={() => handleClick(-1)} disabled={sivu <= 0}>Edellinen</Button>
                <Button onClick={() => handleClick(+1)} disabled={(sivu >= props.children.length-1)}>Seuraava</Button>
            </div>
                {props.children[sivu]}
                </div>
    )


}
export default PageContainer