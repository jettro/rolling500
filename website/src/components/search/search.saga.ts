import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
    executeSearchFailed, receiveSearchResults, REGISTER_SEARCH_CLICK,
    REQUEST_EXECUTE_SEARCH
} from "./search.actions";
import {API_URL} from "../../api";
import {IHit, IHits} from "./search.model";

function* fetchSearchResults(action: { type: string, payload: any }) {
    try {
        const results = yield call(axios.post, `${API_URL.SEARCH}`, {
            searchString: action.payload.searchString,
            page: 0,
            size: 10
        });

        const albums: Array<IHit> = results.data.foundAlbums.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            return iHit;
        });
        const result = new IHits();
        result.hits = albums;
        result.queryId = results.data.queryId;
        yield put(receiveSearchResults(result));
    } catch (e) {
        yield put(executeSearchFailed(e));
    }
}

function* postClick(action: {type: string, payload: any}) {
    try {
        yield call(axios.post, `${API_URL.POST_CLICK}`, action.payload);
    } catch (e) {
        // as this is not mandatory, do not do anything with the error
        console.log(e.message);
    }
}

function* searchSaga() {
    yield takeEvery(REQUEST_EXECUTE_SEARCH, fetchSearchResults);
    yield takeEvery(REGISTER_SEARCH_CLICK, postClick);
}

export default searchSaga;