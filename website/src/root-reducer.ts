import { combineReducers } from 'redux';
import search from './components/search/search.reducer';
import rating from "./components/rating/rating.reducer";

const rootReducer = combineReducers({
    search,
    rating,
});

export default rootReducer;
