import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
//components as following
import Login from '@/components/Login.vue'
//load css component
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'nprogress/nprogress.css'
import 'animate.css/animate.css'
import '@/assert/custom.scss'

Vue.use(BootstrapVue);

class VueModel {
    el: string = '#login';
    template: string = '<Login />';
    components: any = { Login };
}

var model = new VueModel();

new Vue(model);