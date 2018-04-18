import {fork} from 'redux-saga/effects';
import searchSaga from './components/search/search.saga';
import ratingSaga from "./components/rating/rating.saga";
import recommendationSaga from "./components/recommendation/recommendation-saga";

function* rootSaga() {
    yield [
        fork(searchSaga),
        fork(ratingSaga),
        fork(recommendationSaga),
    ];
}

export default rootSaga;
