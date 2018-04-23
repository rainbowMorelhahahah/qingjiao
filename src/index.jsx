import React from 'react';
import ReactDOM from 'react-dom';

import WebRouter from 'router/index.jsx';
import { AppContainer } from 'react-hot-loader';

function render(WebRouter) {
    ReactDOM.render(
        <AppContainer>
            <WebRouter />
        </AppContainer>
        , document.getElementById('app'));
}

render(WebRouter);

//热更新
if (module.hot) {
    module.hot.accept('router/index.jsx', () => {
        const NextApp = require('router/index.jsx').default;
        render(NextApp);
    });
}