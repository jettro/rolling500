import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from "../../api";

import {IHit, IHits} from "../search/search.model";
import {receiveRecommendations, REQUEST_RECOMMENDATIONS, requestRecommendationsFailed} from "./recommendation-actions";

function* findRecommendedAlbums(action: { type: string, payload: any}) {
    try {
        const userId = localStorage.getItem('user_id');

        const results = yield call(axios.get, `${API_URL.RECOMMEND_ALBUMS}/${userId}`);
        const albums: Array<IHit> = results.data.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            iHit.sequence = album.sequence;
            iHit.year = album.year;
            return iHit;
        });
        const result = new IHits();
        result.hits = albums;
        yield put(receiveRecommendations(result));
    } catch(e) {
        yield put(requestRecommendationsFailed(e));
    }
}

function* recommendationSaga() {
    yield takeEvery(REQUEST_RECOMMENDATIONS, findRecommendedAlbums)
}

export default recommendationSaga;