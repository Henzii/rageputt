
export const apolloCacheUpdate = (client, query, data, dataKey, variables=null) => {
    const dataObject = {
        query,
        variables,
        data: {}
    }
    dataObject.data[dataKey] = data
    client.writeQuery( dataObject )
}
