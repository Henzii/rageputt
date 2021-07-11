import { combineReducers, createStore } from 'redux';
import tuloksetReducer from '../reducers/tuloksetReducer'
import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducers = combineReducers({
    tulokset: tuloksetReducer,
    user: userReducer,
    notification: notificationReducer
})

const store = createStore(reducers);

export default store
