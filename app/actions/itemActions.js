import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, FILTER_ITEM } from '../constants';

function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type }
        argNames.forEach((argName, idx) => {
            action[argName] = args[idx]
        })
        return action
    }
}

export const addItem = makeActionCreator(ADD_ITEM)
export const deleteItem = makeActionCreator(DELETE_ITEM, 'item')
export const deleteAll = makeActionCreator(DELETE_ALL)

export function addItemAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addItem())
        }, 1000)
    }
}

// export function addItem() {
//     return {
//         type: ADD_ITEM
//     }
// }

// export function deleteItem(item) {
//     return {
//         type: DELETE_ITEM,
//         item
//     }
// }

// export function deleteAll() {
//     return {
//         type: DELETE_ALL
//     }
// }

export function filterItem(e) {
    let filterItem = e.target.value;
    return {
        type: FILTER_ITEM,
        filterItem
    }
}