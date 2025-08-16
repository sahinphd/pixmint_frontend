<template>
  <div>
    <div class="container-sm  text-white">
      <div class="row">
        
        <!-- Daily Run Component -->
        <div class="col-12">
          <DailyRun 
            :duration="30"
            :reward="2.5"
            :auto-reset="true"
            @task-completed="onTaskCompleted"
            @task-error="onTaskError"
          />
        </div>
        
      

        <!-- Card 2: Investment Package -->
        <div class="col-12">
          <div class="investment-package p-2 rounded">
            <div class="row align-items-center investment-row-one">
              <div class="col-8 d-flex align-items-center gap-2">
                <img src="../assets/img/item8.png" alt="">
                <p class="mb-0">Investment Package</p>
                <img src="../assets/img/15.png" alt="">
              </div>
              <div class="col-4 text-end" @click="$router.push('/profile')" style="cursor: pointer;">
                My order &nbsp; <i class="bi bi-arrow-right-circle-fill" />
              </div>
            </div>

            <div class="row investment-row-two mt-3">
              <div class="col-5">
                <p>Investment value</p>
                <h4>{{total_investment}}USDT</h4>
              </div>
              <div class="col-7">
                <p>Cumulative Income (PIX)</p>
                <h4>{{cumulativeIncome}}PIX</h4>
              </div>
            </div>
          </div>
        </div>

      

        <!-- Card 3: Daily Income Banner -->
        <div class="col-12 mt-2">
          <div class="daily-income rounded">
            <div class="daily-income-value text-center">
              <span></span> Daily income
            </div>
            <div class="amount mt-2">             
              <div class="rate-table-container mt-2">
                <table class="rate-table">
                  <thead>
                    <tr>
                      <th>Package</th>
                      <th>Daily rate of return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>P1: 30-100 USDT</td>
                      <td>1.5% - 1.7%</td>
                    </tr>
                    <tr>
                      <td>P2: 100-250 USDT</td>
                      <td>1.8% - 2.0%</td>
                    </tr>
                    <tr>
                      <td>P3: 250-500 USDT</td>
                      <td>2.1% - 2.3%</td>
                    </tr>
                    <tr>
                      <td>P4: 500-1000 USDT</td>
                      <td>2.4% - 2.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>


           <!-- Card 4: Team Benefits-->
        <div class="col-12 mt-2">
          <div class="team-income rounded">
            <div class="team-income-value text-center">
              <span></span> Team Benefits
            </div>
            <div class="amount">             
              <div class="rate-table-container mt-2">
                <table class="rate-table">
                  <thead>
                    <tr>
                      <th>Team Level</th>
                      <th>Benefits from team</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A: 1st generation</td>
                      <td>12% of team income</td>
                    </tr>
                    <tr>
                      <td>B: 2nd generation</td>
                      <td>5% of team income</td>
                    </tr>
                    <tr>
                      <td>C: 3rd generation</td>
                      <td>3% of team income</td>
                    </tr>                  
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      


      </div>

      <div class="col-12 mt-2">
        <div class="card border shadow-sm p-3 mb-4 bg-body-tertiary rounded exclusive-benefits">
          <HierarchyAccordion :hierarchy="hierarchy" />
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import HierarchyAccordion from '@/components/HierarchyAccordion.vue'
import DailyRun from '@/components/DailyRun.vue'
import DRFapi from '@/utils/drf_api'

const total_investment = ref(0)
const cumulativeIncome = ref(0)
const hierarchy = ref([])

const fetchHierarchy = async (userId) => {
  try {
    const response = await DRFapi.post('/users/hierarchy_by_userid/', { user_id: userId })
    hierarchy.value = response.data || []
  } catch (e) {
    console.log(e);
    hierarchy.value = []
  }
}

// Daily run event handlers
const onTaskCompleted = (data) => {
  console.log('Daily task completed:', data)
  // You can update UI or show notifications here
  cumulativeIncome.value += data.reward
}

const onTaskError = (error) => {
  console.error('Daily task error:', error)
  // Handle error (show toast, etc.)
}

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  if (storedUser?.id) {
    fetchHierarchy(storedUser.id)
  }
})
</script>

<style>
.exclusive-benefits {
  background-image: url('../assets/img/eb.png');
  background-size: cover;
  background-position: center;
  color: #fff;
}

.fluide-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
  border: none;
  color: #fff;
  font-weight: bold;
  display: block;
}

.exclusive-text {
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  gap: 5px;
}

.exclusive-text>span {
  font-size: 1.7rem;
}

.exclusive-input {
  background-color: #a44c00;
  border-color: #a44c00;
  color: #fff;
}

.exclusive-input::placeholder {
  color: #fff;
}

.exclusive-button {
  color: #a44c00;
}

.investment-package {
  background-image: url('../assets/img/item14.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 180px;
}

.investment-row-one img {
  max-height: 1.2rem;
}

.daily-income-value {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  font-size: 1.25rem;
  font-weight: bold;
}

.daily-income {
  background-image: url('../assets/img/item13.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 380px;
}

.team-income {
  background-image: url('../assets/img/item15.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 380px;
}
.team-income-value {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  font-size: 1.25rem;
  font-weight: bold;
}

.amount>.income-slab {
  background-color: #006cdc;
  padding: 10px;
  /* border-radius: 10px; */
}

.amount>.row>.activate {
  background-color: #fff;
  color: #0086ff;
  font-weight: bold;
  border-radius: 5px;
}

.income-input {
  background-color: #0049a4;
  border-color: #0049a4;
  color: #fff;
}

.income-input::placeholder {
  color: #fff;
  opacity: 1;
  /* Firefox */
}

.income-button {
  color: #0086ff;
}

.rate-table-container {
  max-width: 480px;
  background: linear-gradient(135deg, rgba(0, 144, 255, 0.3), rgba(0, 120, 255, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  color: white;
  font-family: 'Segoe UI', sans-serif;
  margin: 20px auto;
}

.rate-table {
  width: 100%;
  border-collapse: collapse;
}

.rate-table th,
.rate-table td {
  text-align: left;
  padding: 10px;
  font-size: 0.95rem;
}

.rate-table thead th {
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.rate-table tbody tr:not(:last-child) td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>