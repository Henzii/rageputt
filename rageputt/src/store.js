import { combineReducers, createStore } from 'redux';
import tuloksetReducer from './reducers/tuloksetReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    tulokset: tuloksetReducer,
    user: userReducer
})

const store = createStore(reducers);

export default store
