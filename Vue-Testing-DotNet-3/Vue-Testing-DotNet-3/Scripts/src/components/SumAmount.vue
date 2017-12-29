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
        <input type="text" id="total" :value="Total" />        
    </div>
</template>

<script lang="ts">

    class SumAmountModel {
        FirstAmount: number;
        SecondAmount: number;

        get Total(): number {
            return this.FirstAmount + this.SecondAmount
        }

        constructor() {
            this.FirstAmount = 0;
            this.SecondAmount = 0;
        }
    }

    let sumAmount = new SumAmountModel();

    export default {
        data() {
            return sumAmount;
        },
        computed: {
            Total: function () {
                return sumAmount.Total
            }
        }
    }    

</script>