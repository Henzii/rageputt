
import { useApolloClient, useQuery } from '@apollo/client'

import { GET_ME } from '../graphql/queries'
import { apolloCacheUpdate } from '../utils/apolloCacheUpdate'

const useGetMe = () => {

    const { loading, data, refetch } = useQuery(GET_ME)
    const client = useApolloClient()

    const updateCache = (updateData) => {
        apolloCacheUpdate(client, GET_ME, updateData, 'getMe')
    }
    return { me: data?.getMe ?? null, loading, refetch, updateCache };
}

export default useGetMe;