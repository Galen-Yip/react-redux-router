import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import request from 'react-request';

/**
 * logs previous and current state for every action call
 * @param getState
 * @returns {Function}
 */
// const logger = createLogger(
//     {
//         collapsed: true,
//         predicate: (getState, action) => process.env.NODE_ENV !== 'production'
//     }
// )



export default [
    thunk,
    // logger,
    // request
]