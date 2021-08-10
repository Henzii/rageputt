import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { IS_USERNAME_AVAILABLE } from "../graphql/queries"

const useIsUsernameAvailable = () => {
    
    const [ getName, { loading, data } ] = useLazyQuery(IS_USERNAME_AVAILABLE, { fetchPolicy: 'cache-and-network' })
    const [ username, setUsername ] = useState('')
    const [ available, setAvailable] = useState(null)
    const [ timerId, setTimerId ] = useState(null)

    useEffect( () => {
        if (!loading && data) {
            if (username !== '')
                setAvailable( data.isUsernameAvailable )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading])

    const setName = (name) => {
        setUsername(name)
        if (name === '') setAvailable(null)
        else setAvailable('loading')
        
        if (timerId !== null) clearTimeout(timerId)
        
        const tid = setTimeout( () => {
            getName({ variables: { user: name }})
        }, 1000)
        setTimerId(tid)
    }
    return { username, setName, available }
}
export default useIsUsernameAvailable