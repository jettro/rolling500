import {IAction} from "../../types/action";
import {
    EXECUTE_STORE_MY_RATING,
    EXECUTE_STORE_MY_RATING_FAILED,
    RECEIVE_MY_RATINGS,
    RECEIVE_RANDOM_ALBUMS, RECEIVE_RATINGS_DISTRIBUTION,
    REQUEST_MY_RATINGS,
    REQUEST_MY_RATINGS_FAILED,
    REQUEST_RANDOM_ALBUMS,
    REQUEST_RANDOM_ALBUMS_FAILED,
    REQUEST_RATINGS_DISTRIBUTION,
    REQUEST_RATINGS_DISTRIBUTION_FAILED
} from "./rating.actions";
import {IHits} from "../search/search.model";
import {RatingDistribution} from "./rating.model";

class IState {
    isFetching: boolean;
    ratings: Array<number>;
    errorMessage: string;
    isFetchingAlbums: boolean;
    albums: IHits;
    isFetchingRatingsDistribution: boolean;
    ratingsDistribution: Array<RatingDistribution>;
}

const initialState: IState = {
    isFetching: false,
    ratings: [],
    errorMessage: null,
    isFetchingAlbums: false,
    albums: new IHits(),
    isFetchingRatingsDistribution: false,
    ratingsDistribution: []
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
        case REQUEST_RANDOM_ALBUMS:
            return Object.assign({}, state, {
                isFetchingAlbums: true,
                errorMessage: null,
            });
        case RECEIVE_RANDOM_ALBUMS:
            return Object.assign({}, state, {
                isFetchingAlbums: false,
                albums: action.payload.albums,
            });
        case REQUEST_RANDOM_ALBUMS_FAILED:
            return Object.assign({}, state, {
                isFetchingAlbums: false,
                errorMessage: action.payload.errorMessage,
            });

        case REQUEST_RATINGS_DISTRIBUTION:
            return Object.assign({}, state, {
                isFetchingRatingsDistribution: true,
                errorMessage: null
            });
        case RECEIVE_RATINGS_DISTRIBUTION:
            return Object.assign({}, state, {
                isFetchingRatingsDistribution: false,
                ratingsDistribution: action.payload.ratingsDistribution,
            });
        case REQUEST_RATINGS_DISTRIBUTION_FAILED:
            return Object.assign({}, state, {
                isFetchingRatingsDistribution: false,
                errorMessage: action.payload.errorMessage,
            });
        default:
            return state;
    }
}

export default rating;