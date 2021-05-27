
const initData = {
    round: 1,
    players: [
        {
            name: 'Henkka',
            tulokset: [
                5,4,3,4,2,3,4,5,2,1,0,2,3,4,2,1,0,1,0,1,0,1,0
            ]
        },
        {
            name: 'Pena',
            tulokset: [
                0,1,2,1,2,1,1,1,2,2,1,2,1,2,0,0,0,1,2,1,2,2,1
            ]
        }
    ]
}

const reducer = (state = initData, action) => {
    switch(action.type) {
        case 'INC_ROUND':
            if (state.round < 20)
                return {...state, round: state.round + 1 }
            else return state;
        case 'DEC_ROUND':
            if (state.round > 1)
                return {...state, round: state.round - 1 } 
            else return state;
        case 'SET_SCORE':
            const pelaaja = state.players.find(p => p.name === action.data.name)

            if (!pelaaja) return state;
            
            pelaaja.tulokset[action.data.round] = action.data.score;

            const pal = {...state, players: state.players.map(p => (p.name === pelaaja.name) ? pelaaja : p ) }
            return pal
        default:
            return state;
    }
}

export default reducer;