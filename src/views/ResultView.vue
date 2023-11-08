<template>
  <div class="grid-container">
    <div class="grid-item text-section left-section">
      <RouterLink class="result-button" to="/cam">{{ $t('intro.button5') }}</RouterLink>
    </div>
    <div class="grid-item middle-section">
      <div class="text-container">
        <h1 class="result-title">{{ $t('intro.resultTitle') }}</h1>
        <p class="time">{{ formattedTimerValue }}</p>
        <p class="result-desc">you were focused for one minute! this is really complicated nowadays</p>
      </div>
    </div>
    <div class="grid-item text-section right-section">
      <RouterLink class="result-button" to="/home">{{ $t('intro.button6') }}</RouterLink>
    </div>
  </div>
</template>
  
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas:
    "left middle right";
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--c-red);
  color: var(--c-black);
  font-family: var(--f-light);
}

.text-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  text-transform: uppercase;
}

.left-section {
  grid-area: left;
  text-align: center;
}

.middle-section {
  grid-area: middle;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  text-transform: uppercase;
  text-align: center;
  height: 100vh;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 4rem 0rem;
}

.right-section {
  grid-area: right;
  text-align: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.result-title {
  font-size: var(--t-header1);
}

.time {
  font-size: var(--t-header1);
  border: 3px var(--c-black) solid;
  border-radius: 50%;
  padding: 1.5rem 3rem;
  font-family: var(--f-light);
}

.result-button {
  text-decoration: none;
  color: var(--c-black);
  border: 3px var(--c-black) solid;
  border-radius: 50%;
  padding: 1.5rem 3rem;
  width: max-content;
  font-size: var(--t-header3);
  margin-bottom: 3rem;
  cursor: url('../assets/cursor_black.png'), auto;
}

.right-section .result-button {
  rotate: 8deg;
}

.left-section .result-button {
  rotate: -8deg;
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    grid-template-areas:
      "middle middle"
      "left right";
  }

  .middle-section {
    height: 50vh;
  }

  .text-section {
    justify-content: flex-start;
    height: 50vh;
  }
}
</style>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const timerValue = ref(null);
const formattedTimerValue = ref('');

onMounted(() => {
  timerValue.value = parseFloat(route.params.timerValue);
  formattedTimerValue.value = formatTimer(timerValue.value);
});

function formatTimer(timer) {
  let milliseconds = Math.floor((timer * 1000) % 1000);
  let seconds = Math.floor(timer % 60);
  let minutes = Math.floor(timer / 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
</script>
  