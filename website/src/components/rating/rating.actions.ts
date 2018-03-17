import {IHit} from "../search/search.model";
import {isNumber} from "util";

export const REQUEST_MY_RATINGS = 'EXECUTE_REQUEST_MY_RATINGS';
export const REQUEST_MY_RATINGS_FAILED = 'EXECUTE_REQUEST_MY_RATINGS_FAILED';
export const RECEIVE_MY_RATINGS = 'RECEIVE_MY_RATINGS';

export const EXECUTE_STORE_MY_RATING = 'EXECUTE_STORE_MY_RATING';
export const EXECUTE_STORE_MY_RATING_FAILED = 'EXECUTE_STORE_MY_RATING_FAILED';
export const EXECUTE_STORE_MY_RATING_SUCCESS = 'EXECUTE_STORE_MY_RATING_SUCCESS';

export function requestMyRatings() {
    return {
        type: REQUEST_MY_RATINGS,
        payload: {}
    }
}

export function receiveMyRatings(results: any) {
    return {
        type: RECEIVE_MY_RATINGS,
        payload: {
            ratings: results
        }
    }
}

export function requestMyRatingsFailed(e: Error) {
    return {
        type: REQUEST_MY_RATINGS_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}

export function executeStoreRating(hit: IHit, rating: number) {
    return {
        type: EXECUTE_STORE_MY_RATING,
        payload: {
            hit: hit,
            rating: rating,
        }
    }
}

export function executeStoreMyRatingsFailed(e: Error) {
    return {
        type: EXECUTE_STORE_MY_RATING_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}

export function executeStoreRatingSuccess(ratings: Array<number>) {
    return {
        type: EXECUTE_STORE_MY_RATING_SUCCESS,
        payload: {
            ratings: ratings,
        }
    }
}