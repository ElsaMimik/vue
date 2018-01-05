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
    function init(userName: string) {
        
        var awaiter = new Promise(function (resolve, reject) {
            Controller.get(
                userName,
                (data) => {
                    member.userName = data.UserName;
                    member.loginId = data.LoginId;
                    member.age = data.Age;
                    member.ip = data.Ip;
                    resolve();
                },
                (res) => {
                    res && res.data && alert(res.data.ExceptionMessage);
                    reject();
                }
            );
        });

        awaiter.then(() => {
            console.log('member init request done...');
            EventBus.$emit('member-init-done');
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
        handler(newValue: string, oldValue: string) {
            newValue && (newValue !== oldValue) && init(newValue);
        }

    }

</script>