import { Component } from 'react';
import axios from 'axios';

axios.interceptors.request.use(config => {
    //这里可以做loading show 处理
    return config
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, error => Promise.resolve(error, response))

var checkStatus = response => {
    //这里可以做loading hide处理
    if (response.status === 200 || response.status === 304) {
        return response.data
    }
    //这里做服务器错误处理(可以引入第三方showMessage组件) 
    alert('服务器错误,错误状态码为:' + response.status);
    return {
        code: response.status,
        message: response.statusText,
        data: response.statusText,
    }
}, checkCode = res => {
    if (res.code !== 'success') {
        //这里做后端返回数据错误处理(可以引入第三方showMessage组件) 
        alert('后端错误,错误状态码为:' + res.code);
    }
    return res
}, post = (url, data) => {
    return axios({
        method: 'post',
        url,
        data: QS.stringify(data),
        timeout: 30000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(checkStatus).then(checkCode)
}, get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params,
        timeout: 30000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(checkStatus).then(checkCode)
};
Component.prototype.post = post;
Component.prototype.get = get;