import { createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/reducer';

const middleWare = [thunk];

const INITIAL_STATE = {};   

const store = createStore(rootReducers, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;