import { combineReducers } from 'redux';
import item from './item.js';
import filter from './filter.js';

export default combineReducers({
    item,
    filter
})