// 入口文件

import './main.css';

import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import routes from './routes/routes.jsx';
import configureStore from './store/configureStore';

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
            <Router history={createHistory()}>
                { routes }
            </Router>
        </Provider>
        {renderDevTools(store)}
    </div>
, document.getElementById('app'));