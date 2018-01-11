<template>
    <div class="table-wrapper member-new-form" v-if="show">
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group label="Member Name:" label-for="user-name" description="The Name of Member">
                <b-form-input id="user-name" type="text" v-model="form.userName" required placeholder="Enter Member Name"></b-form-input>
            </b-form-group>
            <b-form-group label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
                <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email"></b-form-input>
            </b-form-group>
            <b-form-group label="Need Exception" label-for="exception">
                <b-form-input id="exception" type="text" v-model.number="form.isException"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="second">Reset</b-button>
            <b-button type="button" variant="secondary" @click="onCancel">Cancel</b-button>
        </b-form>
    </div>
</template>

<script lang="ts">

    //reference component decorators
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
    import EventBus from '../lib/event-bus'
    //reference model and api
    import * as Model from '../api/member-m'
    import Controller from '../api/member'

    @Component
    export default class MemberNewFormComponent extends Vue {

        form: Model.NewMemberRequest = new Model.NewMemberRequest();

        show: boolean = false;

        @Prop({ default: 0 })
        triggerOpen: number;

        @Prop({ default: 0 })
        triggerClose: number;

        onSubmit(event) {
            
            Controller.put(this.form).then(() => {
                console.log('new member success');
                EventBus.$emit('new-member-success');
            }).catch((error) => {
                alert(error.response.data.ExceptionMessage);
            });
            
            event.preventDefault();
        }

        onReset(event) {
            this.form.userName = '';
            this.form.email = '';
            this.form.isException = 0;
            event.preventDefault();
        }

        onCancel(event) {
            this.show = false;
            event.preventDefault();
        }

        @Watch('triggerOpen', { immediate: true })
        openHandler(newVal) {
            if (newVal > 0) {
                this.show = true;
            }
        }

        @Watch('triggerClose', { immediate: true })
        closeHandler(newVal) {
            if (newVal > 0) {
                this.show = false;
            }
        }
    }

</script>

<style scoped>
    .member-new-form {
        width: 500px;
    }
</style>
