//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import axios from 'axios';
axios.defaults.baseURL = '/api/';
export default {
    request: function (config, successCallback, errorCallback) {
        var instance = axios.create();
        return instance.request(config).then(function (response) {
            if (successCallback) {
                successCallback(response.data, response);
            }
        }, function (response) {
            if (errorCallback) {
                errorCallback(response);
            }
        });
    }
};
//# sourceMappingURL=base-handler.js.map