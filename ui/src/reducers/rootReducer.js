import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import searchInputReducer from './searchInputReducer';
import mealtypeReducer from './mealtypeReducer';

export default combineReducers ({
    simpleReducer,
    searchInputReducer,
    mealtypeReducer
});