import axios from 'axios';

let backendHost: string = process.env.API_URL;

axios.defaults.baseURL = `${backendHost}/api`;

export const API_URL = {
    SEARCH: 'albums/search',
    POST_CLICK: 'searchstats',
    MODELS: 'albums/ltrmodels',
    MY_RATINGS: 'rating',
    RANDOM_ALBUMS: 'albums/random',
    RECOMMEND_ALBUMS: 'recommender/user'
};

export const IMG_URL = `${backendHost}/images/`;


