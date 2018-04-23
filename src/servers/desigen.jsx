import appconfig from 'config/app';
import axios from 'axios';

import storejs from 'storejs';


export default class Design {

    config = {
        headers: {
            "Authorization": 'Bearer ' + storejs.get('token')
        }
    }

    create(data) {
        return axios.post(appconfig.appUrl + '/design/create', data, this.config).catch((err) => {
            this.catch(err);
        });
    }

    getList(data) {
        return axios.post(appconfig.appUrl + '/design/index', data, this.config).catch((err) => {
            this.catch(err);
        })
    }

    delete(id) {
        return axios.delete(appconfig.appUrl + `/design/${id}/delete`, this.config).catch((err) => {
            this.catch(err);
        });
    }

    find(id) {
        return axios.get(appconfig.appUrl + `/design/${id}/find`, this.config).catch((err) => {
            this.catch(err);
        });
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