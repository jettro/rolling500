import { combineReducers } from 'redux';
import search from './components/search/search.reducer';
import rating from "./components/rating/rating.reducer";
import recommendation from './components/recommendation/recommendation-reducer';

const rootReducer = combineReducers({
    search,
    rating,
    recommendation,
});

export default rootReducer;
