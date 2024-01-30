import axios from 'axios';
import config from './config';

const { apiUrl } = config;

axios.defaults.baseURL = apiUrl;

export default axios;