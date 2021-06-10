
const reducer = (state = {round: 0, roundId: null}, action) => {
    switch(action.type) {
        case 'INC_ROUND':
            if (state.round < 19)
                return {...state, round: state.round + 1 }
            else return state;
        case 'DEC_ROUND':
            if (state.round >= 1)
                return {...state, round: state.round - 1 } 
            else return state;
        case 'SET_ID':
            return { ...state, roundId: action.data.roundId }
        case 'INIT_ROUND':
            return action.data;
        case 'RESET_ROUND':
            return { round: 0, roundId: null }
        default:
            return state;
    }
}

export default reducer;