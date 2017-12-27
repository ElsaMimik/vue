//AxiosResponse is optional
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import * as Model from './member-m'

//AxiosResponse can be replaced by any
//(response: any) => { ... }
declare function successCallback(data: any, response?: AxiosResponse): void;
declare function errorCallback(response?: AxiosResponse): void;

axios.defaults.baseURL = '/api/';

function requestHandle(config: AxiosRequestConfig, successCallback?, errorCallback?) {
    let instance = axios.create();
    return instance.request(config).then((response: AxiosResponse) => {
        if (successCallback) {
            successCallback(response.data, response);
        }
    }, (response: AxiosResponse) => {
        if (errorCallback) {
            errorCallback(response);
        }
    });
}

export default {
    get(userName: string, successCallback?, errorCallback?) {
        let config = {
            url: '/member/' + userName,
            method: 'get'
        };
        return requestHandle(config, successCallback, errorCallback);
    },
    login(request: Model.LoginRequest, successCallback?, errorCallback?) {
        let data = {
            LoginId: request.loginId,
            Password: request.password
        };
        let config = {
            url: '/member/login',
            method: 'post'
        };
        return requestHandle(config, successCallback, errorCallback);
    }
}