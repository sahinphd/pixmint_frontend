<template>
    <div class="col-12">
        <div class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded exclusive-benefits">
            <h2>Exclusive Benefits</h2>
            <!-- <button class="fluide-glass col-md-4 mb-1">
                Limited to one order
            </button> -->
            <div class="exclusive-text"><span>1.50%-1.70%</span>&nbsp; Daily Income</div>
            <div class="exclusive-text"><span>1095</span>&nbsp; Daily Expiration</div>
            <div class="exclusive-text">Minimum amount: 30 - 500 USDT</div>

            <form class="row g-2 exclusive-form">
                <div class="col-7">
                    <input type="text" class="form-control exclusive-input" placeholder="Invest to PIX" readonly>
                </div>
                <div class="col-5">
                    <button 
                        type="button" 
                        class="btn btn-light w-100 exclusive-button" 
                        @click="handleInvestClick"
                    >
                        Invest now
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExclusiveBenefit',
    methods: {
        handleInvestClick() {
            this.$router.push('/profile');
        }
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>