<template>
   <div class="col-6 col-md-4">
              <div class="p-2 bg-dark rounded h-100">
                <p class="small mb-1">Total Asset:
                  <i class="bi bi-eye-fill" style="cursor: pointer;"></i>
                </p>
                <div class="d-flex flex-column gap-1">
                  <span>Total Order Amount:
                    <TotalOrderAmount :userId="user?.id" v-model="totalAmount" />
                  </span>
                  <span>Total Earning:
                    <TotalEarningByUser :userId="user?.id" v-model="totalEarning" />
                  </span>
                </div>
                <div class="mt-2">
                  <strong>Total Asset:</strong> {{ totalAsset.toFixed(2) }}
                  <span class="ms-2 small">(Total Asset = {{ totalAmount.toFixed(2) }} + {{ totalEarning.toFixed(2)
                    }})</span>
                </div>
              </div>
            </div>
</template>
<script>
import { ref, computed } from 'vue';    

export default {
  setup() {
    const totalAmount = ref(0);
    const totalEarning = ref(0);

    const totalAsset = computed(() => {
      return totalAmount.value + totalEarning.value;
    });

    return {
      totalAmount,
      totalEarning,
      totalAsset
    };
  }
};
</script>