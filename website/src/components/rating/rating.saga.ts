import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from "../../api";
import {
    EXECUTE_STORE_MY_RATING, executeStoreMyRatingsFailed, receiveMyRatings, receiveRandomAlbums,
    REQUEST_MY_RATINGS, REQUEST_RANDOM_ALBUMS, requestMyRatings,
    requestMyRatingsFailed, requestRandomAlbumsFailed
} from "./rating.actions";
import {IHit, IHits} from "../search/search.model";


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

function* findRandomAlbums(action: { type: string, payload: any}) {
    try {
        const results = yield call(axios.get, `${API_URL.RANDOM_ALBUMS}`);
        const albums: Array<IHit> = results.data.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            iHit.sequence = album.sequence;
            iHit.year = album.year;
            return iHit;
        });
        const result = new IHits();
        result.hits = albums;
        yield put(receiveRandomAlbums(result));
    } catch(e) {
        yield put(requestRandomAlbumsFailed(e));
    }
}

function* ratingSaga() {
    yield takeEvery(REQUEST_MY_RATINGS, fetchMyRatings);
    yield takeEvery(EXECUTE_STORE_MY_RATING, storeMyRatings);
    yield takeEvery(REQUEST_RANDOM_ALBUMS, findRandomAlbums)
}

export default ratingSaga;