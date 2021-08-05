const reducer = (state = { alive: false}, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.data.message,
                title: action.data.title,
                type: action.data.type,
                alive: true
            }
        case 'KILL_NOTIFICATION':
           return { ...state, alive:false }
        default:
            return state
    }
}
export const setNotification = (message, type, title='') => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            type,
            message,
            title,
        }
    }
}
export const killNotification = () => {
    return {
        type: 'KILL_NOTIFICATION',
        data: {}
    }
}
export default reducer;