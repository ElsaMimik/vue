<template>
    <div class="table-wrapper">
        <b-table striped hover :items="members"></b-table>
        <b-alert variant="dark" :show="members.length === 0">No Records</b-alert>
    </div>
</template>

<script lang="ts">

    //reference component decorators
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
    //reference modules
    import Moment from 'moment'
    //reference model and api
    import * as Model from '../api/member-m'
    import Controller from '../api/member'
    
    async function getMembers(): Promise<Model.MemberInfo[]> {
        let members = await Controller.listing();
        return members;
    }

    @Component
    export default class MemberSheetComponent extends Vue {

        members: Model.MemberInfo[] = [];

        @Prop({ default: 0 })
        triggerSearch: number;

        @Watch('triggerSearch', { immediate: true })
        handler(newVal, oldVal) {
            if (newVal === 0) { return; }
            if (newVal !== oldVal) {
                getMembers().then((result) => {
                    this.members = result;
                }).catch((error) => {
                    alert(error.response.data.ExceptionMessage);
                });
            }
        }
    }

</script>

