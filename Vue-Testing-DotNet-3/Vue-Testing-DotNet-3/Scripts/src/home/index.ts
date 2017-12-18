import Vue from 'vue'
import Welcome from '@/components/Welcome.vue'

let v = new Vue({
    el: '#app',
    template: '<Welcome/>',
    components: { Welcome }
})