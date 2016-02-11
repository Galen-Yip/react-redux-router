// 路由

import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import App from '../containers/app.jsx';
import Home from '../containers/home.jsx';
import NotFound from '../containers/notFound.jsx';

function routes(history) {
    return (
        <Router history={history} >
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Route>
        </Router>
    )
}

export default routes;