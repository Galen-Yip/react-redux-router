// 入口文件

import './main.css';

import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import configureStore from './store/configureStore';
import Home from './containers/home.jsx';

const store = configureStore({});
// const historyOptions = {
//   queryKey : false
// };

function renderDevTools(store) {
    // if(__DEBUG__) {
        const DevTools = require('./containers/DevTools').default;
        return (
            <DevTools store={ store }/>
        )
    // }else {
    //     return null
    // }
}

ReactDOM.render(
    <div>
        <Provider store={ store }>
            <Home />
        </Provider>
        {renderDevTools(store)}
    </div>
, document.getElementById('app'));