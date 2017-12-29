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

    export default {
        props: {
            initValue: {
                type: String,
                default: ''
            }
        },
        data() {

            let model = {
                date: Moment(),
                member: member
            };

            setInterval(() => {
                model.date = Moment();
            }, 1000);

            return model;
        },
        computed: {
            dateNow() {
                let dateString = this.date.format('YYYY-MM-DD HH:mm:ss');
                return dateString;
            }
        },
        watch: {
            initValue: {
                immediate: true,
                handler(newValue, oldValue) {
                    newValue && (newValue !== oldValue) && init(newValue);
                }
            }
        }
    }

</script>