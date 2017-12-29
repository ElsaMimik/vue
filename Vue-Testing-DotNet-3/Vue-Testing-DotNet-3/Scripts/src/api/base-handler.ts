//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

axios.defaults.baseURL = '/api/';

export default {
    request(config: AxiosRequestConfig, successCallback?: CallbackFunction.Success, errorCallback?: CallbackFunction.Error) {
        return axios.create().request(config).then(
            (response: AxiosResponse) => successCallback && successCallback(response.data, response),
            (error: AxiosError) => errorCallback && errorCallback(error.response, error)
        )
    }
};
