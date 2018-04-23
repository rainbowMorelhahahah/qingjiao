import appconfig from 'config/app';
import axios from 'axios';

import storejs from 'storejs';

export default class Permission {
    //获取列表
    config = {
        headers: {
            "Authorization": 'Bearer ' + storejs.get('token')
        }
    }
    constructor(){
        console.log(this.config)
    }

    list(data) {
        return axios.post(appconfig.appUrl + '/permission/list', data, this.config).catch((err) => {
            this.catch(err);
        });
    }
    //创建对象
    create(data) {
        return axios.put(appconfig.appUrl + '/permission/create', data, this.config).catch((err) => {
            this.catch(err);
        });
    }
    update(data) {
        return axios.post(appconfig.appUrl + '/permission/update', data, this.config).catch((err) => {
            this.catch(err);
        });
    }
    delete(id) {
        return axios.delete(appconfig.appUrl + '/permission/' + id + '/delete', this.config).catch((err) => {
            this.catch(err);
        });
    }

    tree() {
        return axios.get(appconfig.appUrl + '/permission/tree', this.config).catch((err) => {
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

