/// <reference path="../lib/callback.d.ts" />
//reference callback.d.ts for debug witout error

//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

class HttpModel {

    constructor() {
        axios.defaults.baseURL = '/api/';
    }

    request(config: AxiosRequestConfig, successCallback?: HttpCallback.Success, errorCallback?: HttpCallback.Error) {
        return axios.create().request(config).then(
            (response: AxiosResponse) => successCallback && successCallback(response.data, response),
            (error: AxiosError) => errorCallback && errorCallback(error.response, error)
        )
    }
}

export default new HttpModel();
