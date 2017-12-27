//AxiosResponse is optional
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

//AxiosResponse can be replaced by any
//(response: any) => { ... }
declare function successCallback(data: any, response?: AxiosResponse): void;
declare function errorCallback(response?: AxiosResponse): void;

axios.defaults.baseURL = '/api/';

export default {
    request(config: AxiosRequestConfig, successCallback?, errorCallback?) {
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
}