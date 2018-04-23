import appconfig from 'config/app';
import axios from 'axios';

export default class Auth {
    register(data) {
        return axios.post(appconfig.appUrl + '/register', data);
    }
    login(data) {
        return axios.post(appconfig.appUrl + '/login', data);
    }
}

