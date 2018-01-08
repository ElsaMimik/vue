<template>
    <div v-bind:params="initValue">
        <div>
            UserName: <span>{{member.userName}}</span>
        </div>
        <div>
            LoginId: <span>{{member.loginId}}</span>
        </div>
        <div>
            Age: <span>{{member.age}}</span>
        </div>
        <div>
            Ip: <span>{{member.ip}}</span>
        </div>
        <div>
            Now: <span>{{dateNow}}</span>
        </div>
    </div>
</template>

<script lang="ts">

    //reference component decorators
    import Vue from 'vue'
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import Moment from 'moment'
    //EventBus is used to communicate between different module
    import EventBus from '../lib/event-bus'
    //reference api files
    import * as Model from '../api/member-m'
    import Controller from '../api/member'

    let member = new Model.Member();

    //AxiosResponse can be replaced by any
    //(response: any) => { ... }
    async function init(userName: string) {

        await Controller.get(userName).then((memberData) => {
            if (memberData) {
                member.userName = memberData.userName;
                member.loginId = memberData.loginId;
                member.age = memberData.age;
                member.ip = memberData.ip;
            }
            console.log('member init request done...');
            EventBus.$emit('member-init-done');
        }).catch((error) => {
            error && alert(error.response.data.ExceptionMessage);
        });
    }

    @Component
    export default class MemberInfoComponent extends Vue {

        @Prop({ default: '' })
        initValue: string;

        date: any = Moment();
        member: Model.Member = member;

        mounted () {
            setInterval(() => {
                this.date = Moment();
            }, 1000);
        }

        get dateNow() {
            let dateString = this.date.format('YYYY-MM-DD HH:mm:ss');
            return dateString;
        }

        @Watch('initValue', { immediate: true })
        async handler(newValue: string, oldValue: string) {
            newValue && (newValue !== oldValue) && await init(newValue);
        }

    }

</script>