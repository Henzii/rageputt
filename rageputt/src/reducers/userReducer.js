
const reducer = (state = {}, action ) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                user: action.data.user,
                name: action.data.name
            }
        case 'CLEAR_USER':
            return {}
        default:
            return state
    }
}
export const setUser = (name, user) => {
    return {
        type: 'SET_USER',
        data: {
            user,
            name
            
        }
    }
}
export const clearUser = () => {
    return {
        type: 'CLEAR_USER',
        data: {}
    }
}
export default reducer