import {IAction} from "../../types/action";
import {
    EXECUTE_SEARCH_DOUBLE_FAILED,
    EXECUTE_SEARCH_FAILED, RECEIVE_SEARCH_DOUBLE_RESULTS, RECEIVE_SEARCH_RESULTS, REGISTER_SEARCH_CLICK,
    REQUEST_EXECUTE_DOUBLE_SEARCH,
    REQUEST_EXECUTE_SEARCH
} from "./search.actions";
import {IHits} from "./search.model";

class IState {
    isFetching: boolean;
    hits: IHits;
    withLtrHits: IHits;
    withoutLtrHits: IHits;
    errorMessage: string;
}

const initialState: IState = {
    isFetching: false,
    hits: new IHits(),
    errorMessage: null,
    withLtrHits: new IHits(),
    withoutLtrHits: new IHits(),
};

function search(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case REQUEST_EXECUTE_SEARCH:
        case REQUEST_EXECUTE_DOUBLE_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: null,
            });
        case RECEIVE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                isFetching: false,
                hits: action.payload.hits,
                errorMessage: null,
            });
        case RECEIVE_SEARCH_DOUBLE_RESULTS:
            return Object.assign({}, state, {
                isFetching: false,
                withLtrHits: action.payload.hits.withLtrHits,
                withoutLtrHits: action.payload.hits.withoutLtrHits,
                errorMessage: null,
            });
        case EXECUTE_SEARCH_FAILED:
        case EXECUTE_SEARCH_DOUBLE_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.errorMessage,
            });
        case REGISTER_SEARCH_CLICK:
        default:
            return state;
    }
}

export default search;