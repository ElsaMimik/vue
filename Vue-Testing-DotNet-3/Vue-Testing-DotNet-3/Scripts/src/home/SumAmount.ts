import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
//components as following
import SumAmount from '@/components/sumAmount.vue'

Vue.use(BootstrapVue);

class VueModel {
    el: string = '#sumamount';
    template: string = '<SumAmount />';
    components: any = { SumAmount };
}

var model = new VueModel();

new Vue(model);