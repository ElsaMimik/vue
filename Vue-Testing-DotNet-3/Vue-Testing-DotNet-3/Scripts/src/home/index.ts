import Vue from 'vue'
//EventBus is used to communicate between different module
import EventBus from '../event-bus'
//reference components as following
import Welcome from '@/components/Welcome.vue'
import MemberInfo from '@/components/MemberInfo.vue'

class VueModel {
    el: string;
    template: string;
    components: {};
}

let model = new VueModel();
model.el = '#app';
model.template = '<div>\
                    <Welcome />\
                    <MemberInfo />\
                  </div>';
model.components = {
    Welcome,
    MemberInfo
};

EventBus.$emit('init', 'alpha');

new Vue(model);
