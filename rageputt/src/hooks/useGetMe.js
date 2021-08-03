
import { useApolloClient, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ME } from '../graphql/queries'
import { apolloCacheUpdate } from '../utils/apolloCacheUpdate'

const useGetMe = () => {

    const { loading, data, refetch } = useQuery(GET_ME)

    const [ me, setMe ] = useState(null)
    const client = useApolloClient()

    useEffect( () => {
        if (!loading && data) {
            setMe(data.getMe);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading])
    const updateCache = (updateData) => {
        apolloCacheUpdate(client, GET_ME, updateData, 'getMe')
    }
    return { me, loading, refetch, updateCache };
}

export default useGetMe;