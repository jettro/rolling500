import {IAction} from "../../types/action";
import {IHits} from "../search/search.model";
import {
    RECEIVE_PREDICTION,
    RECEIVE_RECOMMENDATION_DASHBOARD,
    RECEIVE_RECOMMENDATIONS,
    REQUEST_PREDICTION, REQUEST_PREDICTION_FAILED,
    REQUEST_RECOMMENDATION_DASHBOARD,
    REQUEST_RECOMMENDATION_DASHBOARD_FAILED,
    REQUEST_RECOMMENDATIONS,
    REQUEST_RECOMMENDATIONS_FAILED
} from "./recommendation-actions";
import {RecommendationStatistics} from "./recommendation-model";

class IState {
    isFetching: boolean;
    errorMessage: string;
    albums: IHits;
    statistics: RecommendationStatistics;
    prediction: number;
}

const initialState: IState = {
    isFetching: false,
    errorMessage: null,
    albums: new IHits(),
    statistics: new RecommendationStatistics(),
    prediction: 0,
};

function recommendation(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case REQUEST_RECOMMENDATIONS:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: null,
            });
        case RECEIVE_RECOMMENDATIONS:
            return Object.assign({}, state, {
                isFetching: false,
                albums: action.payload.albums,
            });
        case REQUEST_RECOMMENDATIONS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.errorMessage,
            });
        case REQUEST_RECOMMENDATION_DASHBOARD:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: null,
            });
        case RECEIVE_RECOMMENDATION_DASHBOARD:
            return Object.assign({}, state, {
                isFetching: false,
                statistics: action.payload.statistics,
            });
        case REQUEST_RECOMMENDATION_DASHBOARD_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.errorMessage,
            });
        case REQUEST_PREDICTION:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: null,
            });
        case RECEIVE_PREDICTION:
            return Object.assign({}, state, {
                isFetching: false,
                prediction: action.payload.prediction,
            });
        case REQUEST_PREDICTION_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.errorMessage,
                prediction: 0,
            });
        default:
            return state;
    }
}

export default recommendation;
