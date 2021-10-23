import { combineReducers } from 'redux'
import reducerInitial from './initial/initial';
import {reducerSeller} from './seller/reducerSeller'
import {reducerBuyer} from './buyer/reducerBuyer'

export default combineReducers({
    authorization:reducerInitial,
    seller : reducerSeller,
    buyer : reducerBuyer
});