//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import axios, { AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'

axios.defaults.baseURL = '/api/';

export default {
    request(config: AxiosRequestConfig, successCallback?: CallBackFunction.SuccessCallback, errorCallback?: CallBackFunction.ErrorCallback) {
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
