import Vue from 'vue'
import EventBus from '../EventBus'
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

EventBus.$emit('init', 'alpha')

new Vue(model);
