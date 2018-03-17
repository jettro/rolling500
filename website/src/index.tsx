import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';
import App from './app';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

interface RequireImport {
    default: any;
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const generateUUID = () => { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', this.generateUUID())
}

// Redux store
let store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware, loggerMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app', () => {
        const NextApp = require<RequireImport>('./app').default;

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp />
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
