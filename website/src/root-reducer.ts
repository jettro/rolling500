import { combineReducers } from 'redux';
import search from './components/search/search.reducer';

const rootReducer = combineReducers({
    search,
});

export default rootReducer;
