import { combineReducers } from 'redux';
import home from './home.js';
import notFound from './notFound.js';

export default combineReducers({
    home,
    notFound
})