import Immutable from 'immutable';
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, FILTER_ITEM } from '../constants';

const initialItems = Immutable.List([1,2,3]);

export default function items(state = initialItems, action) {
    switch(action.type) {
        case ADD_ITEM:
            return state.push( state.size !== 0 ? state.get(-1)+1 : 1 );
        case DELETE_ITEM:
            return state.delete( state.indexOf(action.item) );
        case DELETE_ALL:
            return state.clear();
        case FILTER_ITEM:
            return filter();
        default:
            return state;
    }
}

const initialFilterItem = ''

function filter(state = initialFilterItem, action) {
    switch(action.type) {
        case FILTER_ITEM:
            return action.filterItem
        default:
            return state
    }
}