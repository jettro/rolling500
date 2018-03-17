import {IAction} from "../../types/action";
import {
    EXECUTE_STORE_MY_RATING,
    EXECUTE_STORE_MY_RATING_FAILED, RECEIVE_MY_RATINGS, REQUEST_MY_RATINGS,
    REQUEST_MY_RATINGS_FAILED
} from "./rating.actions";

class IState {
    isFetching: boolean;
    ratings: Array<number>;
    errorMessage: string;
}

const initialState: IState = {
    isFetching: false,
    ratings: [],
    errorMessage: null,
};

function rating(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case REQUEST_MY_RATINGS:
        case EXECUTE_STORE_MY_RATING:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: null,
            });
        case RECEIVE_MY_RATINGS:
            return Object.assign({}, state, {
                isFetching: false,
                ratings: action.payload.ratings,
            });
        case REQUEST_MY_RATINGS_FAILED:
        case EXECUTE_STORE_MY_RATING_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.errorMessage,
            });
        default:
            return state;
    }
}

export default rating;