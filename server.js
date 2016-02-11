import path from 'path';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';

import rootReducer from './app/reducers';
import middleware from './app/middleware';
import createRoutes from './app/routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use('/build', express.static(path.join(__dirname, 'build')));  //设置build文件夹为存放静态文件的目录
app.use(handleRender);

function handleRender(req, res) {

    const history = createMemoryHistory();
    const routes = createRoutes(history)
    const location = createLocation(req.url);

    // req.url is the full url
    match({ routes, location }, (err, redirectLocation, renderProps) => {
        if(err) {
            return res.status(500).send(err.message)
        }

        if(!renderProps) {
            return res.status(404).send('not found')
        }

        const store = compose(
            applyMiddleware.apply(this, middleware)
        )(createStore)(rootReducer)

        // render the component to string
        const initialView = renderToString(
            <div>
                <Provider store={store}>
                    { <RoutingContext {...renderProps} /> }
                </Provider>
            </div>
        )

        const initialState = store.getState();

        res.status(200).send(renderFullPage(initialView, initialState))
    })


}

function renderFullPage(html, initialState) {
    const assets =  require('./stats.json');

    return `
        <!DOCTYPE html>
            <!--[if lt IE 7 ]> <html lang="en" class="ie6" > <![endif]-->
            <!--[if IE 7 ]>    <html lang="en" class="ie7" > <![endif]-->
            <!--[if IE 8 ]>    <html lang="en" class="ie8" > <![endif]-->
            <!--[if IE 9 ]>    <html lang="en" class="ie9" > <![endif]-->
            <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="" > <!--<![endif]-->
            <head>
              <meta charset="utf-8">
              <title>react-redux-router</title>
              <link href="./build/${assets.assetsByChunkName.app[1]}" rel="stylesheet">
              
            </head>
            <body>

            <div id="app">${html}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="./build/${assets.assetsByChunkName.vendors}"></script>

            <script src="./build/${assets.assetsByChunkName.app[0]}"></script>

            </body>
        </html>
        `
}

app.listen(port, () => {
    console.log('this server is running on ' + port)
});