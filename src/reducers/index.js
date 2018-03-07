import cardReducer from './card'
import { combineReducers } from 'redux'

const reducers = { card: cardReducer }
export default combineReducers(reducers)
