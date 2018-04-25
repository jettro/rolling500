import {IAction} from "../../types/action";
import {IHits} from "../search/search.model";
import {
    RECEIVE_RECOMMENDATION_DASHBOARD,
    RECEIVE_RECOMMENDATIONS, REQUEST_RECOMMENDATION_DASHBOARD, REQUEST_RECOMMENDATION_DASHBOARD_FAILED,
    REQUEST_RECOMMENDATIONS,
    REQUEST_RECOMMENDATIONS_FAILED
} from "./recommendation-actions";
import {RecommendationStatistics} from "./recommendation-model";

class IState {
    isFetching: boolean;
    errorMessage: string;
    albums: IHits;
    statistics: RecommendationStatistics;
}

const initialState: IState = {
    isFetching: false,
    errorMessage: null,
    albums: new IHits(),
    statistics: new RecommendationStatistics(),
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
                isFetching: true,
                errorMessage: null,
            });
        default:
            return state;
    }
}

export default recommendation;
