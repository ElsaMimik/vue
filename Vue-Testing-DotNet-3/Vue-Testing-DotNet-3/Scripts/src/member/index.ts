import Vue from 'vue'
import EventBus from '../lib/event-bus'
import BootstrapVue from 'bootstrap-vue'
import MemberSheet from '@/components/MemberSheet.vue'
import MemberNewForm from '@/components/MemberNewForm.vue'

Vue.use(BootstrapVue);

function cycleNumber(num, max, min) {
    var currentValue = (num + 1) % max;
    return currentValue === 0 ? min : currentValue;
}

new Vue({
    el: 'div.btn-toolbar',
    methods: {
        searchClick(event) {
            EventBus.$emit('searchClick');
        },
        addClick(event) {
            EventBus.$emit('toggleForm', 'open');
        }
    }
});

new Vue({
    el: '#member-listing',
    template: '<member-sheet :trigger-search="triggerSearch" />',
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
            this.triggerSearch = cycleNumber(this.triggerSearch, 10, 1);
        });
    }
});

new Vue({
    el: '#member-new-form',
    template: '<member-new-form :triggerOpen="open" :triggerClose="close" />',
    props: {
        open: {
            type: Number,
            default: 0
        },
        close: {
            type: Number,
            default: 0
        }
    },
    components: {
        MemberNewForm
    },
    mounted() {
        EventBus.$on('toggleForm', (command) => {
            switch(command) {
                case 'open':
                    this.open = cycleNumber(this.open, 10, 1);
                    break;
                case 'close':
                    this.close = cycleNumber(this.close, 10, 1);
                    break;
                default:
                    break;
            }
        })
    }
});