import { combineReducers } from 'redux';
import items from './items';
import filter from './filter';

export default combineReducers({
    items,
    filter
})