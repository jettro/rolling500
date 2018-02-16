import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
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

// Redux store
let store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware, thunkMiddleware, loggerMiddleware))
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
