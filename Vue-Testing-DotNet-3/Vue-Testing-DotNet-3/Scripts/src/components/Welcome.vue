<template>
    <div>
        <span>{{userName}} login success</span>
        <br />
        <span>Welcome to the vue's world</span>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue'
    import { Component } from 'vue-property-decorator'

    @Component
    export default class WelcomeComponent extends Vue {

        userName: string = 'alpha'

        mounted() {
            console.log('welcome model initial...')
        }
    }

</script>
