export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS';
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS';
export const REQUEST_RECOMMENDATIONS_FAILED = 'REQUEST_RECOMMENDATIONS_FAILED';

export function requestRecommendations() {
    return {
        type: REQUEST_RECOMMENDATIONS,
        payload: {}
    }
}

export function receiveRecommendations(results: any) {
    return {
        type: RECEIVE_RECOMMENDATIONS,
        payload: {
            albums: results
        }
    }
}

export function requestRecommendationsFailed(e: Error) {
    return {
        type: REQUEST_RECOMMENDATIONS_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}
