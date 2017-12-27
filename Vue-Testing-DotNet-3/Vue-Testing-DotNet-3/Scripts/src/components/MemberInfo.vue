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

    //EventBus is used to communicate between different module
    import EventBus from '../event-bus'
    //reference api files
    import * as Model from '@/api/member-m'
    import Controller from '@/api/member.ts'

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
                (response) => {
                    alert(response);
                    reject();
                }
            );
        });
        awaiter.then(() => console.log('member initial done...'));
    }

    EventBus.$on('init', function (userName) {
        init(userName);
    });

    export default {
        props: {
            dateNow: {
                type: String,
                default: new Date().toString()
            }
        },
        data() {
            return {
                member: member
            };
        }
    }

</script>