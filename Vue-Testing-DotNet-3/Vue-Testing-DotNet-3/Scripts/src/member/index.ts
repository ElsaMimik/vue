import Vue from 'vue'
import EventBus from '../lib/event-bus'
import BootstrapVue from 'bootstrap-vue'
import MemberSheet from '@/components/MemberSheet.vue'
import MemberNewForm from '@/components/MemberNewForm.vue'
import 'signalr'


Vue.use(BootstrapVue);

function cycleNumber(num, max, min) {
    var currentValue = (num + 1) % max;
    return currentValue === 0 ? min : currentValue;
}

let listingComponent = new Vue({
    el: '#member-listing',
    template: '<member-sheet :trigger-search="triggerSearch" />',
    props: {
        triggerSearch: {
            type: Number,
            default: 0
        }
    },
    methods: {
        search() {
            this.triggerSearch = cycleNumber(this.triggerSearch, 10, 1);
        }
    },
    components: {
        MemberSheet
    }
});

let formComponent = new Vue({
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
    methods: {
        toggle(command) {
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
        }
    }
});

let baseComponent = new Vue({
    el: 'div.btn-toolbar',
    methods: {
        searchClick(event) {
            listingComponent.search();
        },
        addClick(event) {
            formComponent.toggle('open');
        }
    }
});

let hub = $.hubConnection(document.location.protocol + '//' + document.location.host);
let proxy = hub.createHubProxy('MemberHub');

proxy.on('newNotify', (data) => {
    listingComponent['search']();
    console.log('receive message from signalr hub MemberHub-newNotify...');
});

hub.start().done(() => {
    proxy.invoke('joinGroup', 'member-room');
    console.log('signalr connect success...');
});
