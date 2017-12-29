import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
//components as following
import Login from '@/components/Login.vue';
Vue.use(BootstrapVue);
var VueModel = /** @class */ (function () {
    function VueModel() {
        this.el = '#app';
        this.template = '<Login />';
        this.components = { Login: Login };
    }
    return VueModel;
}());
var model = new VueModel();
new Vue(model);
//# sourceMappingURL=login.js.map