import Vue from 'vue'
import EventBus from '../lib/event-bus'
import BootstrapVue from 'bootstrap-vue'
import MemberSheet from '@/components/MemberSheet.vue'

Vue.use(BootstrapVue);

new Vue({
    el: 'div.btn-group',
    methods: {
        searchClick(event) {
            EventBus.$emit('searchClick');
        }
    }
});

new Vue({
    el: '#member-app',
    template: '<member-sheet :trigger-search="triggerSearch"/>',
    props: {
        triggerSearch: {
            type: Number,
            default: 0
        }
    },
    components: {
        MemberSheet
    },
    mounted() {
        EventBus.$on('searchClick', () => {
            this.triggerSearch = this.triggerSearch + 1;
        });
    }
});