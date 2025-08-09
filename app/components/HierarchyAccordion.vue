<template>
  <div class="card border shadow-sm p-3 mb-4 bg-body-tertiary rounded hierarchy-card">
    <h3 class="text-center mb-3">Referral Hierarchy</h3>

    <div v-if="hierarchy.length">
      <div class="accordion" id="refHierarchy">
        <!-- LEVEL A -->
        <div
          v-for="(a, idxA) in levelA"
          :key="a.usercode"
          class="accordion-item accordion-item-color"
        >
          <!-- Check if this A has B-children -->
          <template v-if="childrenMapB[a.usercode] && childrenMapB[a.usercode].length">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed  accordion-item-color" type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapseA'+idxA"
              >
                <span class="badge bg-primary me-2">A</span>
                <strong>{{ a.name }}</strong> ({{ a.userid }})
              </button>
            </h2>
            <div :id="'collapseA'+idxA" class="accordion-collapse collapse" data-bs-parent="#refHierarchy">
              <div class="accordion-body">
                <!-- LEVEL B INSIDE A -->
                <div
                  v-for="(b, idxB) in childrenMapB[a.usercode]"
                  :key="b.usercode"
                  class="ms-3 mb-2"
                >
                  <!-- Does this B have C-children? -->
                  <template v-if="childrenMapC[b.usercode] && childrenMapC[b.usercode].length">
                    <div class="accordion" :id="'bAccordion'+a.usercode+idxB">
                      <div class="accordion-item accordion-item-color">
                        <h2 class="accordion-header">
                          <button class="accordion-button collapsed py-2" type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#collapseB'+a.usercode+idxB"
                          >
                            <span class="badge bg-success me-2">B</span>
                            <strong>{{ b.name }}</strong> ({{ b.userid }})
                          </button>
                        </h2>
                        <div :id="'collapseB'+a.usercode+idxB" class="accordion-collapse collapse"
                          :data-bs-parent="'#bAccordion'+a.usercode+idxB">
                          <div class="accordion-body py-2 px-3">
                            <!-- LEVEL C INSIDE B -->
                            <div
                              v-for="c in childrenMapC[b.usercode]"
                              :key="c.usercode"
                              class="ms-3 mt-1"
                            >
                              <span class="badge bg-warning text-dark me-2">C</span>
                              <strong>{{ c.name }}</strong> ({{ c.userid }})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <!-- Plain row for B (no C-children) -->
                    <div class="d-flex align-items-center py-1">
                      <span class="badge bg-success me-2">B</span>
                      <strong>{{ b.name }}</strong> ({{ b.userid }})
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <!-- A-level with NO B children -->
            <div class="accordion-header d-flex align-items-center py-2 px-3">
              <span class="badge bg-primary me-2">A</span>
              <strong>{{ a.name }}</strong> ({{ a.userid }})
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-muted">
      No referrals found.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props: expects a flat array of users with label = A/B/C etc.
const props = defineProps({
  hierarchy: {
    type: Array,
    default: () => [],
  },
});

// LEVEL A (direct children)
const levelA = computed(() =>
  props.hierarchy.filter(user => user.label === 'A')
);

// Precompute children maps for fast lookup
// Map[parent_usercode] = [all direct children]
const childrenMapB = computed(() => {
  const map = {};
  props.hierarchy.forEach(user => {
    if (user.label === 'B') {
      if (!map[user.refarcode]) map[user.refarcode] = [];
      map[user.refarcode].push(user);
    }
  });
  return map;
});
const childrenMapC = computed(() => {
  const map = {};
  props.hierarchy.forEach(user => {
    if (user.label === 'C') {
      if (!map[user.refarcode]) map[user.refarcode] = [];
      map[user.refarcode].push(user);
    }
  });
  return map;
});
</script>

<style scoped>
.hierarchy-card {
  /* Removed background-image for plain color */
  background-color: #0a305f !important;  /* optional dark blue background to contrast text */
  color: #fff; /* white text for readability */
  padding: 1rem;
  border-radius: 12px;
}
.accordion-item-color{
    background-color: #4510c6 !important;
    color: #fff !important;
}

/* Tree List Styles */
.tree-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0.5rem;
}

.tree-node {
  margin-bottom: 5px;
  position: relative;
  padding-left: 0.5rem;
}

.tree-node .tree-branch {
  display: inline-block;
  border-left: 2px solid #1a91f6 !important; /* branch line color */
  height: 100%;
  margin-left: 1rem;
}

/* Level Indentation */
.level-a { margin-left: 0rem; }
.level-b { margin-left: 1.5rem; }
.level-c { margin-left: 3rem; }

/* Badge Styling */
.badge {
  font-size: 0.95em;
  color: white;
  background-color: #1a91f6 !important; /* Blue for all levels */
  border-radius: 4px;
  padding: 0.25em 0.5em;
}


</style>
