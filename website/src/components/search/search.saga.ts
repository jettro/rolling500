import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
    EXECUTE_FETCH_LTRMODELS,
    executeDoubleSearchFailed, executeFetchLtrModelsFailed,
    executeSearchFailed, receiveDoubleSearchResults, receiveFetchLtrModels, receiveSearchResults, REGISTER_SEARCH_CLICK,
    REQUEST_EXECUTE_DOUBLE_SEARCH,
    REQUEST_EXECUTE_SEARCH
} from "./search.actions";
import {API_URL} from "../../api";
import {IHit, IHits, LtrModel} from "./search.model";

function* fetchSearchResults(action: { type: string, payload: any }) {
    try {
        const results = yield call(axios.post, `${API_URL.SEARCH}`, {
            searchString: action.payload.searchString,
            page: 0,
            size: 10,
            enableLtr: action.payload.enableLtr,
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

function* fetchSearchDoubleResults(action: { type: string, payload: any }) {
    try {
        const withResults = yield call(axios.post, `${API_URL.SEARCH}`, {
            searchString: action.payload.searchString,
            page: 0,
            size: 10,
            enableLtr: true,
            ltrModel: action.payload.ltrModel,
        });

        const withAlbums: Array<IHit> = withResults.data.foundAlbums.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            return iHit;
        });
        const withResult = new IHits();
        withResult.hits = withAlbums;
        withResult.queryId = withResults.data.queryId;

        const withoutResults = yield call(axios.post, `${API_URL.SEARCH}`, {
            searchString: action.payload.searchString,
            page: 0,
            size: 10,
            enableLtr: false,
        });

        const withoutAlbums: Array<IHit> = withoutResults.data.foundAlbums.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            return iHit;
        });
        const withoutResult = new IHits();
        withoutResult.hits = withoutAlbums;
        withoutResult.queryId = withoutResults.data.queryId;

        const result = {
            withLtrHits: withResult,
            withoutLtrHits: withoutResult,
        };

        yield put(receiveDoubleSearchResults(result));
    } catch (e) {
        yield put(executeDoubleSearchFailed(e));
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

function* fetchLtrModels(action: {type: string, payload: any}) {
    try {
        const results = yield call(axios.get, `${API_URL.MODELS}`);

        const ltrModels: Array<LtrModel> = results.data.map((model: any) => {
            return new LtrModel(model.id, model.name)
        });

        yield put(receiveFetchLtrModels(ltrModels));
    } catch (e) {
        yield put(executeFetchLtrModelsFailed(e));
    }
}

function* searchSaga() {
    yield takeEvery(REQUEST_EXECUTE_SEARCH, fetchSearchResults);
    yield takeEvery(REGISTER_SEARCH_CLICK, postClick);
    yield takeEvery(REQUEST_EXECUTE_DOUBLE_SEARCH, fetchSearchDoubleResults);
    yield takeEvery(EXECUTE_FETCH_LTRMODELS, fetchLtrModels)
}

export default searchSaga;
