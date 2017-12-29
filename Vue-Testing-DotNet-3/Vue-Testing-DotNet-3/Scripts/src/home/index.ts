import Vue from 'vue'
//EventBus is used to communicate between different module
import EventBus from '../lib/event-bus'
//reference components as following
import Welcome from '@/components/Welcome.vue'
import MemberInfo from '@/components/MemberInfo.vue'

new Vue({
    el: '#app',
    template: '<div>\
                 <Welcome />\
                 <MemberInfo :init-value="userName" />\
               </div>',
    components: {
        Welcome,
        MemberInfo
    },
    props: {
        userName: {
            type: String,
            default: ''
        }
    },
    beforeMount() {
        this.userName = 'alpha'
        EventBus.$once('member-init-done', () => {
            console.log('member info component finished...');
        });
    }
});
