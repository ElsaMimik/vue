import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

//components as following
import Login from '@/components/Login.vue'

Vue.use(BootstrapVue);

class VueModel {
    el: string = '#app';
    template: string = '<Login />';
    components: any = { Login };
}

var model = new VueModel();

new Vue(model);