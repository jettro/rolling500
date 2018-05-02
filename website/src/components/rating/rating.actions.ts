import {IHit} from "../search/search.model";

export const REQUEST_MY_RATINGS = 'EXECUTE_REQUEST_MY_RATINGS';
export const REQUEST_MY_RATINGS_FAILED = 'EXECUTE_REQUEST_MY_RATINGS_FAILED';
export const RECEIVE_MY_RATINGS = 'RECEIVE_MY_RATINGS';

export const EXECUTE_STORE_MY_RATING = 'EXECUTE_STORE_MY_RATING';
export const EXECUTE_STORE_MY_RATING_FAILED = 'EXECUTE_STORE_MY_RATING_FAILED';

export const REQUEST_RANDOM_ALBUMS = 'REQUEST_RANDOM_ALBUMS';
export const RECEIVE_RANDOM_ALBUMS = 'RECEIVE_RANDOM_ALBUMS';
export const REQUEST_RANDOM_ALBUMS_FAILED = 'REQUEST_RANDOM_ALBUMS_FAILED';

export const REQUEST_RATINGS_DISTRIBUTION = 'REQUEST_RATINGS_DISTRIBUTION';
export const RECEIVE_RATINGS_DISTRIBUTION = 'RECEIVE_RATINGs_DISTRIBUTION';
export const REQUEST_RATINGS_DISTRIBUTION_FAILED = 'REQUEST_RATINGS_DISTRIBUTION_FAILED';

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

export function requestRandomAlbums() {
    return {
        type: REQUEST_RANDOM_ALBUMS,
        payload: {}
    }
}

export function receiveRandomAlbums(results: any) {
    return {
        type: RECEIVE_RANDOM_ALBUMS,
        payload: {
            albums: results
        }
    }
}

export function requestRandomAlbumsFailed(e: Error) {
    return {
        type: REQUEST_RANDOM_ALBUMS_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}

export function requestRatingsDistribution() {
    return {
        type: REQUEST_RATINGS_DISTRIBUTION,
        payload: {}
    }
}

export function receiveRatingsDistribution(results: any) {
    return {
        type: RECEIVE_RATINGS_DISTRIBUTION,
        payload: {
            ratingsDistribution: results
        }
    }
}

export function requestRatingsDistributionFailed(e: Error) {
    return {
        type: REQUEST_RATINGS_DISTRIBUTION_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}

