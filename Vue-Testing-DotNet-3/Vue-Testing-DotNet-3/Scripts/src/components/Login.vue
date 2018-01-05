<template>
    <div class="mb-2 text-white login-form">
        <b-form @submit="loginSubmit">
            <b-form-group>
                <h1><b-badge variant="dark">Operator System</b-badge></h1>
            </b-form-group>
            <b-form-group>
                <b-form-input v-model="loginId" type="text" placeholder="LoginId"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="secondary">Login</b-button>
            </b-form-group>
            <b-form-group>
                <b-alert variant="danger" :show="showAlert">{{errorMessage}}</b-alert>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">

    //reference component decorators
    import { Component, Vue } from 'vue-property-decorator'
    //reference api files
    import { LoginRequest } from '../api/member-m'
    import Controller from '../api/member'

    @Component
    export default class LoginComponent extends Vue {

        loginId: string = '';
        password:string = '';
        showAlert: boolean = false;
        errorMessage: string = '';

        loginSubmit(event) {

            //stop default action for form submit
            event.preventDefault();

            if (this.loginId && this.password) {

                var request = new LoginRequest();
                request.loginId = this.loginId;
                request.password = this.password;

                Controller.login(request, (data) => {
                    if (data && data === 'success') {
                        location.href = '/';
                        return;
                    }
                    this.errorMessage = 'LoginId or Password not match...';
                    this.showAlert = true;
                }, (res) => {
                    if (res && res.data && res.data.ExceptionMessage) {
                        this.errorMessage = res.data.ExceptionMessage;
                    }
                    else {
                        this.errorMessage = 'error occurred...';
                    }
                    this.showAlert = true;
                });
            }
        }
    }

</script>

<style scoped>
    .login-form {
        width: 500px;
        padding: 30px 50px;
        margin: 200px auto;
        /* support Safari, Chrome */
        -webkit-border-radius: 10px;
        /* support firefox */
        -moz-border-radius: 10px;
        border-radius: 10px;
        background-color: #CCEEFF;
    }

        .login-form button {
            width: 100%;
        }

        .login-form span {
            width: 100%;
            padding: 8px;
        }

    .alert-primary {
        -webkit-border-radius: 5px;
        /* support firefox */
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
</style>