import {call, put, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from "../../api";

import {IHit, IHits} from "../search/search.model";
import {
    receivePrediction,
    receiveRecommendationDashboard,
    receiveRecommendations, REQUEST_PREDICTION,
    REQUEST_RECOMMENDATION_DASHBOARD,
    REQUEST_RECOMMENDATIONS, requestPredictionFailed,
    requestRecommendationDashboardFailed,
    requestRecommendationsFailed
} from "./recommendation-actions";
import {RecommendationStatistics, RecommendedAlbumStatistics} from "./recommendation-model";

function* findRecommendedAlbums(action: { type: string, payload: any}) {
    try {
        const userId = localStorage.getItem('user_id');

        const results = yield call(axios.get, `${API_URL.RECOMMEND_ALBUMS}/${userId}`);
        const albums: Array<IHit> = results.data.map((album: any) => {
            let iHit = new IHit(album.id, album.album, album.artist, album.information);
            iHit.image = album.image;
            iHit.sequence = album.sequence;
            iHit.year = album.year;
            iHit.score = album.score;
            return iHit;
        });
        const result = new IHits();
        result.hits = albums;
        yield put(receiveRecommendations(result));
    } catch(e) {
        yield put(requestRecommendationsFailed(e));
    }
}

function* findRecommendationDashboard(action: { type: string, payload: any}) {
    try {
        const results = yield call(axios.get, `${API_URL.RECOMMEND_ALBUMS}/_all`);
        const statistics: RecommendationStatistics = new RecommendationStatistics();
        statistics.amountOfItemsToRecommend = results.data.amountOfItemsToRecommend;
        statistics.amountOfUsers = results.data.amountOfUsers;
        statistics.amountOfUsersWithRecommendations = results.data.amountOfUsersWithRecommendations;

        let albumStats: Array<RecommendedAlbumStatistics> = results.data.sortedAlbumStatistics.map((albumStatistics: any) => {
            let recAlbumStats: RecommendedAlbumStatistics = new RecommendedAlbumStatistics();
            recAlbumStats.avgPosition = albumStatistics.avgPosition;
            recAlbumStats.avgScore = albumStatistics.avgScore;
            recAlbumStats.sequence = albumStatistics.sequence;
            recAlbumStats.numberOfRecommendations = albumStatistics.numberOfRecommendations;

            return recAlbumStats;
        });
        statistics.albumStatistics = albumStats;
        yield put(receiveRecommendationDashboard(statistics));
    } catch(e) {
        yield put(requestRecommendationDashboardFailed(e));
    }
}

function* findPrediction(action: { type: string, payload: any}) {
    try {
        const userId = localStorage.getItem('user_id');
        const sequence:number = action.payload.selectedAlbum.sequence;

        const results = yield call(axios.get, `${API_URL.PREDICT_ALBUM}/user/${userId}/sequence/${sequence}`);

        const prediction:number = results.data;

        yield put(receivePrediction(prediction));
    } catch (e) {
        yield put(requestPredictionFailed(e))
    }
}

function* recommendationSaga() {
    yield takeEvery(REQUEST_RECOMMENDATIONS, findRecommendedAlbums);
    yield takeEvery(REQUEST_RECOMMENDATION_DASHBOARD, findRecommendationDashboard);
    yield takeEvery(REQUEST_PREDICTION, findPrediction);
}

export default recommendationSaga;