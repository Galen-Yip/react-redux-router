// 基于reducer创建store

import { createStore, applyMiddleware, compose } from 'redux';
import middleware from '../middleware';
import rootReducer from '../reducers';

let createStoreWithMiddleware;
if(__DEBUG__) {
    createStoreWithMiddleware = compose(
        applyMiddleware.apply(this, middleware),
        require('../containers/DevTools').default.instrument()
    )(createStore)
}else {
    createStoreWithMiddleware = compose(
        applyMiddleware.apply(this, middleware)
    )(createStore)
}

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if(module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;

            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}