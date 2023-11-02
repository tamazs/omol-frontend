<template>
  <NavBar v-if="showNone" />
  <router-view />
  <Footer v-if="isHomeRoute && showNone" />
  <Footer2 v-else-if="showNone" />
  <BottomInfo v-if="showNone" />
  <div class="screensaver" :style="{ display: isScreensaverVisible ? 'block' : 'none' }">
    <div class="countdown">
      <p class="time">{{ formattedTimerValue }}</p>
      <p class="time-text">{{ $t('home.screensaverText') }}</p>
    </div>
  </div>
  <div class="curtain-column"></div>
</template>

<style scoped>
.curtain-column {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--c-red);
  z-index: 1000;
}

.screensaver {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--c-red);
  z-index: 9999;
}
.countdown {
  color: var(--c-black);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  color: var(--c-black);
  border: 3px var(--c-black) solid;
  border-radius: 50%;
  padding: 1.5rem 3rem;
  margin-bottom: 10rem;
  font-size: var(--t-header1);
  font-family: var(--f-light);
}

.time-text {
  text-transform: uppercase;
  font-size: var(--t-header3);
  font-family: var(--f-light);
  text-align: center;
}
</style>

<script setup>
import NavBar from './components/NavBar.vue';
import BottomInfo from './components/BottomInfo.vue';
import Footer from './components/Footer.vue';
import Footer2 from './components/Footer2.vue';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isHomeRoute = computed(() => router.currentRoute.value.path === '/home');
const showNone = computed(() => !router.currentRoute.value.path.startsWith('/start') && !router.currentRoute.value.path.startsWith('/screens') && !router.currentRoute.value.path.startsWith('/cam') && !router.currentRoute.value.path.startsWith('/result/'));

const isScreensaverVisible = ref(false);
const timer = ref(null);

const countdownValue = ref(60); // Initial countdown value in seconds

const resetCountdown = () => {
  countdownValue.value = 60; // Reset the countdown to 1 minute
};

const formatTimer = (timer) => {
  const milliseconds = Math.floor((timer * 1000) % 1000).toString().padStart(3, '0');
  const seconds = Math.floor(timer % 60).toString().padStart(2, '0');
  const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
};

const formattedTimerValue = computed(() => {
  return formatTimer(countdownValue.value);
});

const startCountdown = () => {
  clearInterval(timer.value); // Clear the previous interval
  const countdownInterval = setInterval(() => {
    if (countdownValue.value <= 0) {
      clearInterval(countdownInterval);
      isScreensaverVisible.value = false;
    } else {
      countdownValue.value -= 0.1;
    }
  }, 100);
  timer.value = countdownInterval; // Store the new interval ID
};

const resetScreensaver = () => {
  clearTimeout(timer.value);
  isScreensaverVisible.value = false;
  resetCountdown();
  const screensaverElement = document.querySelector('.screensaver');
  screensaverElement.style.display = 'none';

  timer.value = setTimeout(showScreensaver, 60000);
};

const showScreensaver = () => {
  const screensaverElement = document.querySelector('.screensaver');
  screensaverElement.style.display = 'block';
  isScreensaverVisible.value = true;
  startCountdown(); // Start the countdown timer when the screensaver is displayed
};

const setupInactivityTimer = () => {
  // Events to reset the screensaver timer
  window.onload = resetScreensaver;
  window.onclick = resetScreensaver;
  window.ontouchstart = resetScreensaver;
  window.onmousemove = resetScreensaver;
  window.onmousedown = resetScreensaver;
  window.addEventListener('scroll', resetScreensaver, true);
};

onMounted(() => {
  setupInactivityTimer();
});

onBeforeUnmount(() => {
  clearTimeout(timer.value);
});
</script>