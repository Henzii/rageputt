import { Select } from "@material-ui/core"

const DropDown = ( { options, variant="outlined", mappedOptions=false, onChange }) => {

    return (
        <Select
            native
            defaultValue={0}
            variant={variant}
            onChange={ (e) => onChange(e.target.value) }
        >   
            <ParseOptions options={options} mappedOptions={mappedOptions} />
        </Select>
    )
}
const ParseOptions = ({ options, mappedOptions}) => {

    if (mappedOptions === true){
        return Array.from(options.keys()).map(k => 
            <option key={k}
            value={options.get(k)}>{k}
            </option>
        )
    }
    return options.map(o => <option key={o}>{o}</option>)
}
export default DropDown