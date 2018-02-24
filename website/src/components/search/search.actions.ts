export const REQUEST_EXECUTE_SEARCH = 'REQUEST_EXECUTE_SEARCH';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const EXECUTE_SEARCH_FAILED = 'EXECUTE_SEARCH_FAILED';
export const REQUEST_EXECUTE_DOUBLE_SEARCH = 'REQUEST_EXECUTE_DOUBLE_SEARCH';
export const RECEIVE_SEARCH_DOUBLE_RESULTS = 'RECEIVE_SEARCH_DOUBLE_RESULTS';
export const EXECUTE_SEARCH_DOUBLE_FAILED = 'EXECUTE_SEARCH_DOUBLE_FAILED';
export const REGISTER_SEARCH_CLICK = 'REGISTER_SEARCH_CLICK';

export function executeSearch(searchString: string, enableLtr: boolean) {
    return {
        type: REQUEST_EXECUTE_SEARCH,
        payload: {
            searchString: searchString,
            enableLtr: enableLtr
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

export function executeDoubleSearch(searchString: string) {
    return {
        type: REQUEST_EXECUTE_DOUBLE_SEARCH,
        payload: {
            searchString: searchString
        }
    }
}

export function receiveDoubleSearchResults(results: any) {
    return {
        type: RECEIVE_SEARCH_DOUBLE_RESULTS,
        payload: {
            hits: results
        }
    }
}

export function executeDoubleSearchFailed(e: Error) {
    return {
        type: EXECUTE_SEARCH_DOUBLE_FAILED,
        payload: {
            errorMessage: e.message
        }
    }
}


export function registerSearchClick(albumId: number, queryId: string, searchString: string) {
    return {
        type: REGISTER_SEARCH_CLICK,
        payload: {
            albumId: albumId,
            queryId: queryId,
            searchString: searchString,
        }
    }
}