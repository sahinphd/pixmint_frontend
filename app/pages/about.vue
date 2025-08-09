<template>
  <div>
    <div class="container-sm bg-dark text-white">
      <div class="row">
        <!-- Card 1: Exclusive Benefits -->
        <div class="col-12">
          <div class="card border shadow-sm p-3 mb-4 bg-body-tertiary rounded exclusive-benefits">
            <h2>Exclusive Benefits</h2>
            <button class="fluide-glass col-md-4 mb-1">
              Limited to one order
            </button>
            <div class="exclusive-text"><span>1.30%</span>&nbsp; Daily income</div>
            <div class="exclusive-text"><span>1095</span>&nbsp; Daily expiration</div>
            <div class="exclusive-text">Investment amount: 100 - 100000 USD</div>

            <form class="row g-2  exclusive-form">
              <div class="col-7">
                <input type="text" class="form-control exclusive-input" placeholder="Please enter" >
              </div>
              <div class="col-5">
                <button type="submit" class="btn btn-light w-100 exclusive-button">
                  Invest now
                </button>
              </div>
            </form>
          </div>
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
              <div class="col-4 text-end">
                My order &nbsp; <i class="bi bi-arrow-right-circle-fill" />
              </div>
            </div>

            <div class="row investment-row-two mt-3">
              <div class="col-5">
                <p>Investment value</p>
                <h4>50 SUSD</h4>
              </div>
              <div class="col-7">
                <p>Cumulative Income (SAT)</p>
                <h4>172.61331</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Daily Income Banner -->
        <div class="col-12 mt-2 ">
          <div class="daily-income">
            <div class="daily-income-value text-center">
              <span>1.85%</span> Daily income
            </div>
            <div class="amount">
              <div class="row mx-2 income-slab">
                <div class="col-3 activate">30</div>
                <div class="col-3">100</div>
                <div class="col-3">500</div>
                <div class="col-3">1000</div>
              </div>
              <div class="row m-2">
                <div class="col-12">
                  <form class="row g-2  income-form">
                    <div class="col-7">
                      <input type="text" class="form-control income-input" placeholder="Please enter the amount" >
                    </div>
                    <div class="col-5">
                      <button type="submit" class="btn btn-light w-100 income-button">
                        Invest now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="rate-table-container">
    <table class="rate-table">
      <thead>
        <tr>
          <th>Package</th>
          <th>Daily rate of return</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>50-950 SUSD</td>
          <td>0.4% - 2%</td>
        </tr>
        <tr>
          <td>1000-9000 SUSD</td>
          <td>0.5% - 2.2%</td>
        </tr>
        <tr>
          <td>10000-90000 SUSD</td>
          <td>0.6% - 2.4%</td>
        </tr>
        <tr>
          <td>100000-900000 SUSD</td>
          <td>0.7% - 2.7%</td>
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
import DRFapi from '@/utils/drf_api'

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
  height: 135px;
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
  height: 428px;
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
.income-input{
  background-color: #0049a4;
  border-color: #0049a4;
  color: #fff;
}
.income-input::placeholder {
  color: #fff;
  opacity: 1; /* Firefox */
}
.income-button{
  color:#0086ff;
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