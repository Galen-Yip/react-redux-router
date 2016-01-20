import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, FILTER_ITEM } from '../constants';

export function addItem() {
    return {
        type: ADD_ITEM
    }
}

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        item
    }
}

export function deleteAll() {
    return {
        type: DELETE_ALL
    }
}

export function filterItem(e) {
    let filterItem = e.target.value;
    return {
        type: FILTER_ITEM,
        filterItem
    }
}