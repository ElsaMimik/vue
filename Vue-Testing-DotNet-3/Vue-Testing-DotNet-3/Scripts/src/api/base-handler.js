//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import axios from 'axios';
axios.defaults.baseURL = '/api/';
export default {
    request: function (config, successCallback, errorCallback) {
        return axios.create().request(config).then(function (response) { return successCallback && successCallback(response.data, response); }, function (error) { return errorCallback && errorCallback(error.response, error); });
    }
};
//# sourceMappingURL=base-handler.js.map