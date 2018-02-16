export const REQUEST_EXECUTE_SEARCH = 'REQUEST_EXECUTE_SEARCH';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const EXECUTE_SEARCH_FAILED = 'EXECUTE_SEARCH_FAILED';
export const REGISTER_SEARCH_CLICK = 'REGISTER_SEARCH_CLICK';

export function executeSearch(searchString: string) {
    return {
        type: REQUEST_EXECUTE_SEARCH,
        payload: {
            searchString: searchString
        }
    }
}

export function receiveSearchResults(results: any) {
    return {
        type: RECEIVE_SEARCH_RESULTS,
        payload: {
            hits: results
        }
    }
}

export function executeSearchFailed(e: Error) {
    return {
        type: EXECUTE_SEARCH_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}

export function registerSearchClick(albumId: number, queryId: string) {
    return {
        type: REGISTER_SEARCH_CLICK,
        payload: {
            albumId: albumId,
            queryId: queryId,
        }
    }
}