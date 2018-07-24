import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import searchInputReducer from './searchInputReducer';


export default combineReducers ({
    simpleReducer,
    searchInputReducer
});