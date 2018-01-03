<template>
    <div>
        
        <span>First Amount:</span>                        
        <input type="number" id="firstAmount" v-model.number="FirstAmount" />
        <br />

        <span>Second Amount:</span>
        <input type="number" id="secondAmount" v-model.number="SecondAmount" />
        <br />
        <br />

        <span>Total:</span>
        <input type="text" id="total" :value="SumTotal" />        
    </div>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class SumAmountComponent extends Vue {

        FirstAmount: number = 0;
        SecondAmount: number = 0;

        get Total() {
            return this.FirstAmount + this.SecondAmount;
        }
    } 

</script>