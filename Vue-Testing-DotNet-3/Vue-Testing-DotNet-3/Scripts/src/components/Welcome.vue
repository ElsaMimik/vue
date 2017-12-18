<template>
    <div>
        <span>{{userName}}</span>
        <br />
        <span>Welcome to the vue's world</span>
    </div>
</template>

<script>
    export default {
        name: 'Welcome',
        data() {
            return {
                userName: 'alpha'
            }
        }
    }
</script>
