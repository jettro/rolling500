import { fork } from 'redux-saga/effects';
import searchSaga from './components/search/search.saga';

function* rootSaga() {
    yield [
        fork(searchSaga),
    ];
}

export default rootSaga;
