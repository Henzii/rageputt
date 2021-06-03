
const reducer = (state = null, action) => {
    switch(action.type) {
        case 'INC_ROUND':
            if (state.round < 20)
                return {...state, round: state.round + 1 }
            else return state;
        case 'DEC_ROUND':
            if (state.round > 1)
                return {...state, round: state.round - 1 } 
            else return state;
        case 'SET_ID':
            return { ...state, id: action.data.id }
        case 'INIT_ROUND':
            return action.data;
        default:
            return state;
    }
}

export default reducer;