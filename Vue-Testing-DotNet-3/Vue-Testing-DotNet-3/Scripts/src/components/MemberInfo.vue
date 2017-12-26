<template>
    <div>
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

    //AxiosResponse is optional
    import axios, { AxiosResponse } from 'axios'
    //EventBus is used to communicate between different module
    import EventBus from '../event-bus'

    class Member {

        userName: string;
        loginId: string;
        age: number;
        ip: string;

        constructor() {
            this.userName = 'waiting...';
            this.loginId = 'waiting...';
            this.age = 0;
            this.ip = 'waiting...';
        }

        //AxiosResponse can be replaced by any
        //(response: any) => { ... }
        init(userName: string) {
            var self = this;
            axios.get('/api/member/' + userName).then((response: AxiosResponse) => {
                self.userName = response.data.UserName;
                self.loginId = response.data.LoginId;
                self.age = response.data.Age;
                self.ip = response.data.Ip;
            }, (response: AxiosResponse) => {
                alert(response);
            });
        }
    }

    let member = new Member();

    EventBus.$on('init', function (userName) {
        member.init(userName);
    });

    export default {
        props: {
            dateNow: {
                type: Date,
                default: new Date()
            }
        },
        data() {
            return {
                member: member
            };
        }
    }

</script>

<style>

    .aaa {
        background-color: black;
    }

</style>