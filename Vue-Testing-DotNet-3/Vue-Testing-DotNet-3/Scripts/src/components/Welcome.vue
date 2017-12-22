<template>
    <div>
        <span>{{userName}}</span>
        <br />
        <span>Welcome to the vue's world</span>
    </div>
</template>

<script lang="ts">

    class WelcomeModel {
        userName: string;
        constructor(name: string) {
            this.userName = name;
        }
    }

    class ComponentModel {
        name: string;
        constructor(compName: string) {
            this.name = compName;
        }
        data() {
            return new WelcomeModel('alpha');
        }
    }

    export default new ComponentModel('Welcome');

</script>
