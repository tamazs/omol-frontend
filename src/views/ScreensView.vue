<template>
  <div class="screens" @click="nextScreen">
    <div class="text-container">
      <video
        v-if="showCameraFeed"
        class="camera-feed"
        autoplay
        muted
        playsinline
        :style="cameraFeedStyle"
        ref="cameraFeedElement"
      ></video>
      <h1 v-if="currentIndex === 1">{{ $t('intro.thanku') }}</h1>
      <h1 v-if="currentIndex === texts.length - 1">{{ $t('intro.challengeTitle') }}</h1>
      <p class="infoText">{{ currentText }}</p>
      <div class="final-btn-container" v-if="currentIndex === texts.length - 1">
        <RouterLink class="select-btn" to="/cam">{{ $t('intro.button3') }}
          <svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="190" height="72" viewBox="0 0 190 72" fill="none">
              <path class="path" d="M95.1236 70.5249C146.554 70.5249 188.247 55.1851 188.247 36.2625C188.247 17.3399 146.554 2 95.1236 2C43.6929 2 2 17.3399 2 36.2625C2 55.1851 43.6929 70.5249 95.1236 70.5249Z" stroke="#ED1C24" stroke-width="2.63557" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </RouterLink>
        <RouterLink class="select-btn" to="/home">{{ $t('intro.button4') }}
          <svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="190" height="72" viewBox="0 0 190 72" fill="none">
              <path class="path" d="M95.1236 70.5249C146.554 70.5249 188.247 55.1851 188.247 36.2625C188.247 17.3399 146.554 2 95.1236 2C43.6929 2 2 17.3399 2 36.2625C2 55.1851 43.6929 70.5249 95.1236 70.5249Z" stroke="#ED1C24" stroke-width="2.63557" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
      </div>
      <p v-if="currentIndex === 0" class="bottom-text">{{ $t('intro.bottomText1') }}</p>
      <p v-else class="bottom-text">{{ $t('intro.bottomText2') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const texts = ['intro.text3', 'intro.text2', 'intro.challengeText'];

const currentIndex = ref(0);
const currentText = computed(() => t(texts[currentIndex.value]));

const showCameraFeed = ref(false);
const cameraFeedStyle = computed(() => {
  if (showCameraFeed.value) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '20vw', // Adjust the width as needed
      height: 'auto', // Adjust the height as needed
      objectFit: 'cover',
      zIndex: 1,
    };
  } else {
    return {
      display: 'none',
    };
  }
});

const nextScreen = () => {
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++;
  }
};

const cameraFeedElement = ref(null); // Define cameraFeedElement

const startCameraFeed = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (stream) {
      showCameraFeed.value = true;
      if (cameraFeedElement.value) { // Check if cameraFeedElement is not null
        cameraFeedElement.value.srcObject = stream;
      } else {
        console.error('cameraFeedElement is null.');
      }
    } else {
      console.error('Failed to access the camera.');
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};


onMounted(async () => {
  await router.isReady();
  startCameraFeed();
  currentIndex.value = 0;
});

watch(route, () => {
  currentIndex.value = 0;
  showCameraFeed.value = false;
  if (cameraFeedElement.value && cameraFeedElement.value.srcObject) {
    cameraFeedElement.value.srcObject.getTracks().forEach((track) => track.stop());
  }
});
</script>

<style lang="scss" scoped>
.screens {
  background-color: var(--c-white);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-container {
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.infoText {
  color: var(--c-black);
  font-size: var(--t-header3);
  text-transform: uppercase;
  margin-bottom: 2rem;
  line-height: 2rem;
  font-family: var(--f-thin);
  width: 50vw;
}

.camera-feed {
  position: absolute;
  top: 0;
  left: 0;
  width: 20vw;
  height: auto;
  object-fit: cover;
  z-index: 1;
}

h1 {
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-family: var(--f-thin);
  font-size: 50px;
}

.final-btn-container {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

.select-btn {
  text-decoration: none;
  color: var(--c-black);
  font-size: var(--t-header3);
  font-family: var(--f-light);
  cursor:url('../assets/cursor.png'), auto;
}

.bottom-text {
  position: absolute;
  bottom: 50px;
  left: 50%;
  text-transform: uppercase;
  transform: translateX(-50%);
  color: var(--c-black);
  font-size: 1.2rem;
  font-family: var(--f-light);
}

.path {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
}

.select-btn:hover .path {
  transition: 2s;
  stroke-dashoffset: 0;
}

.svg1 {
  position: absolute;
  top: 57%;
  left: 49%;
  transform: translate(-93%, 30%);
}

.svg2 {
  position: absolute;
  top: 57%;
  left: 61%;
  transform: translate(-93%, 30%);
}
</style>
