import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from "../../api";
import {
    EXECUTE_STORE_MY_RATING, executeStoreMyRatingsFailed, executeStoreRatingSuccess, receiveMyRatings,
    REQUEST_MY_RATINGS, requestMyRatings,
    requestMyRatingsFailed
} from "./rating.actions";


function* fetchMyRatings(action: { type: string, payload: any }) {
    try {
        const userId = localStorage.getItem('user_id');

        const results = yield call(axios.get, `${API_URL.MY_RATINGS}/${userId}`);

        const ratings: Array<number> = results.data.ratings;
        yield put(receiveMyRatings(ratings));
    } catch (e) {
        yield put(requestMyRatingsFailed(e));
    }
}

export const getRatings = (state:any) => {
    return state.rating.ratings;
};

function* storeMyRatings(action: {type: string, payload: any}) {
    try {
        let ratings: Array<number> = yield select(getRatings);

        let sequence = action.payload.hit.sequence;
        ratings[sequence] = action.payload.rating;

        const userId = localStorage.getItem('user_id');

        yield call(axios.post, `${API_URL.MY_RATINGS}`, {
            user_id: userId,
            ratings: ratings
        });

        yield put(requestMyRatings());
    } catch (e) {
        yield put(executeStoreMyRatingsFailed(e))
    }
}

function* ratingSaga() {
    yield takeEvery(REQUEST_MY_RATINGS, fetchMyRatings);
    yield takeEvery(EXECUTE_STORE_MY_RATING, storeMyRatings);
}

export default ratingSaga;