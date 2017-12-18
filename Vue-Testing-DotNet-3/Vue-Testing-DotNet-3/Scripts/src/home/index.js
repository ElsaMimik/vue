import Vue from 'vue'
import Welcome from '@/components/Welcome'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Welcome/>',
    components: { Welcome }
})