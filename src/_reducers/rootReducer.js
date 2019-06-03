import {combineReducers} from 'redux';
import {authentication} from './authReducers.js';
import {registration} from './regReducers.js';

const rootReducer = combineReducers({
    authentication,
    registration
});

export default rootReducer;