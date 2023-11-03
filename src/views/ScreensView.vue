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
      <h1 v-if="currentIndex === 0">{{ $t('intro.thanku') }}</h1>
      <h1 v-if="currentIndex === texts.length - 1">{{ $t('intro.challengeTitle') }}</h1>
      <p class="infoText">{{ currentText }}</p>
      <div class="final-btn-container" v-if="currentIndex === texts.length - 1">
        <RouterLink class="select-btn" to="/cam">{{ $t('intro.button3') }}
          <svg
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 205 136"
            width="183"
            height="114"
          >
            <path
              class="path"
              fill="none"
              stroke="#F0444A"
              stroke-width="1.5"
              stroke-miterlimit="10"
              d="M204,35.8c-32.8-2.1-65.8-2.7-98.7-1.8c-24.7,0.7-49.7,2.2-73.3,9.6 c-12.2,3.8-25.3,10.7-28.6,23C2.1,71,2.3,75.7,3,80.2c3.4,21.4,18.7,40.4,38.8,48.4c-12.6-11.4,16.7-30.4,12.5-46.9 c-4.2-16.5-15.6-30.4-29.2-40.6 C112.1,1.7,75.7-4.3,44,5.8"
            ></path>
          </svg>
        </RouterLink>
        <RouterLink class="select-btn" to="/home">{{ $t('intro.button4') }}</RouterLink>
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

const texts = ['intro.text2', 'intro.text3', 'intro.challengeText'];

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
  font-size: var(--t-header1);
  margin-bottom: 2rem;
  font-family: var(--f-thin);
}

.final-btn-container {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
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

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-93%, 30%);
}
</style>
