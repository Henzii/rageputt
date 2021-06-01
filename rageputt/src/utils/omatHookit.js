
import { useState } from 'react'

const useTextField = (type, label = '') => {

    const [ value, setValue ] = useState()

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {
        type,
        onChange,
        value,
        label
    }

}