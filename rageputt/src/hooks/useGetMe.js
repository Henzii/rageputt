
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ME } from '../graphql/queries'

const useGetMe = () => {

    const { loading, data, refetch } = useQuery(GET_ME)

    const [ me, setMe ] = useState(null)

    useEffect( () => {
        if (!loading && data) {
            setMe(data.getMe);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading])

    return { me, loading, refetch };
}

export default useGetMe;