import { fork } from 'redux-saga/effects';
import searchSaga from './components/search/search.saga';
import ratingSaga from "./components/rating/rating.saga";

function* rootSaga() {
    yield [
        fork(searchSaga),
        fork(ratingSaga),
    ];
}

export default rootSaga;
