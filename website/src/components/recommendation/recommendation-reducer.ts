import {IAction} from "../../types/action";
import {IHits} from "../search/search.model";
import {
    RECEIVE_RECOMMENDATIONS,
    REQUEST_RECOMMENDATIONS,
    REQUEST_RECOMMENDATIONS_FAILED
} from "./recommendation-actions";

class IState {
    isFetching: boolean;
    errorMessage: string;
    albums: IHits;
}

const initialState: IState = {
    isFetching: false,
    errorMessage: null,
    albums: new IHits(),
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
        default:
            return state;
    }
}

export default recommendation;
