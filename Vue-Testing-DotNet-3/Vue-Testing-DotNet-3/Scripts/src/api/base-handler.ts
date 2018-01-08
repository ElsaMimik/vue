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

    async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        let result: AxiosResponse = await axios.create().request(config);
        return result;
    }
}

const model = new HttpModel();

export default model;
