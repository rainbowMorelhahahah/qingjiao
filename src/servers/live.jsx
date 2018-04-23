import appconfig from 'config/app';
import axios from 'axios';

import storejs from 'storejs';


export default class LiveServers {

    _config = {
        headers: {
            "Authorization": 'Bearer ' + storejs.get('token')
        }
    }

    create(data) {
        return axios.post(appconfig.appUrl + '/lives/create', data, this._config).then().catch(
            (err) => {
                this.catch(err);
            }
        );
    }

    getList(data) {
        return axios.post(appconfig.appUrl + '/lives/index', data, this._config).catch(
            (err) => {
                this.catch(err);
            }
        )
    }

    get(id) {
        return axios.post(appconfig.appUrl + `/lives/${id}/get`, {}, this._config).catch(
            (err) => {
                this.catch(err);
            }
        );
    }

    update(id, data) {
        return axios.post(appconfig.appUrl + `/lives/${id}/update`, data, this._config).catch(
            (err) => {
                this.catch(err);
            }
        );
    }

    catch(err) {
        if (err.response) {
            if (err.response.status == 401) {
                window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
            } else {
                alert(err.response.data.message);
            }
        }
    }
}