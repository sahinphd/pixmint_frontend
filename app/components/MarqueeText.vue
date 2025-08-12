<template>
  <div class="marquee-wrapper">
    <marquee>
      <p>{{ marqueeText }}</p>
    </marquee>
  </div>
</template>

<script setup>
// Generate random purchase messages inside the component
const uids = [
  '717***535', '486***910', '638***648', '217***460', '216***409', '783***442',
  '349***446', '834***231', '181***813', '655***939', '888***138', '517***540',
  '281***400', '376***324', '481***846', '344***244', '843***038'
];
const packages = [
  { amount: 113, type: 'PIX', level: 'LV1' },
  { amount: 381, type: 'PIX', level: 'LV1' },
  { amount: 103, type: 'PIX', level: 'LV1' },
  { amount: 187, type: 'PIX', level: 'LV1' },
  { amount: 19960, type: 'PIX', level: 'LV3' },
  { amount: 99, type: 'PIX', level: 'LV1' },
  { amount: 1688, type: 'PIX', level: 'LV1' },
  { amount: 199, type: 'PIX', level: 'LV1' },
  { amount: 1000, type: 'SUSD', level: 'LV2' },
  { amount: 107, type: 'PIX', level: 'LV1' },
  { amount: 2955, type: 'PIX', level: 'LV2' },
  { amount: 159, type: 'PIX', level: 'LV1' },
  { amount: 141, type: 'PIX', level: 'LV1' },
  { amount: 319, type: 'PIX', level: 'LV1' },
  { amount: 147, type: 'PIX', level: 'LV1' },
  { amount: 145, type: 'PIX', level: 'LV1' },
  { amount: 113, type: 'PIX', level: 'LV1' }
];

function randomPurchaseMessage() {
  const idx = Math.floor(Math.random() * uids.length);
  const uid = uids[idx];
  const pkg = packages[idx];
  return `UID ${uid} Purchased ${pkg.amount} ${pkg.type} ${pkg.level} Investment package`;
}

const marqueeLength = 20;
const marqueeMessages = Array.from({ length: marqueeLength }, randomPurchaseMessage);
const marqueeText = marqueeMessages.join('   ');
</script>

<style scoped>
.marquee-wrapper {
  width: 100%;
}
marquee {
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
}
</style>
