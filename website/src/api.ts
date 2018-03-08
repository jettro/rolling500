import axios from 'axios';

let backendHost: string = 'http://localhost:8080/api';

axios.defaults.baseURL = `${backendHost}`;

export const API_URL = {
    SEARCH: 'albums/search',
    POST_CLICK: 'searchstats',
    MODELS: 'albums/ltrmodels'
};

export const IMG_URL = 'http://localhost:8080/images/thumbnails/';


