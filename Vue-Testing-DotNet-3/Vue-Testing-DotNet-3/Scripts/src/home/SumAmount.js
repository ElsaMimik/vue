import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
//components as following
import SumAmount from '@/components/sumAmount.vue';
Vue.use(BootstrapVue);
var VueModel = (function () {
    function VueModel() {
        this.el = '#sumamount';
        this.template = '<SumAmount />';
        this.components = { SumAmount: SumAmount };
    }
    return VueModel;
}());
var model = new VueModel();
new Vue(model);
//# sourceMappingURL=SumAmount.js.map