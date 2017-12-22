import Vue from 'vue'
import VueResource from 'vue-resource'
import Welcome from '@/components/Welcome.vue'

class VueModel {
    el: string;
    template: string;
    components: {};
}

let model = new VueModel();
model.el = '#app';
model.template = '<Welcome/>';
model.components = { Welcome };

new Vue(model);