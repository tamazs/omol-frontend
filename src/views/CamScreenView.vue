<template>
  <div class="screens" @click="nextScreen" :style="{ backgroundColor: backgroundColor }">
    <video ref="cameraFeedScreen" class="camera-feed" autoplay muted playsinline></video>
    <div class="text-container-screen">
      <h1 v-if="currentIndex === 0">{{ $t('intro.thanku') }}</h1>
      <h1 v-if="currentIndex === texts.length - 1">{{ $t('intro.challengeTitle') }}</h1>
      <p class="infoText">{{ currentText }}</p>
      <div class="final-btn-container" v-if="currentIndex === texts.length - 1">
        <RouterLink class="select-btn" to="/cam">{{ $t('intro.button3') }}</RouterLink>
        <RouterLink class="select-btn" to="/home">{{ $t('intro.button4') }}</RouterLink>
      </div>
      <p v-if="currentIndex === 0 || currentIndex === 1" class="bottom-text">{{ $t('intro.bottomText1') }}</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import * as faceapi from 'face-api.js';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

let cameraFeedScreen = ref(null);
let intervalId = ref(null);
const cameraInitialized = ref(false);
let backgroundColor = ref('var(--c-white)');
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const texts = ['intro.text2', 'intro.text3', 'intro.challengeText'];

const currentIndex = ref(0);
const currentText = computed(() => t(texts[currentIndex.value]));

const nextScreen = () => {
  if (cameraInitialized.value === false) {
    // Initialize the camera on the first click
    cameraInitialized.value = true;
    initializeFaceApiAndVideoElements();
  }
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++;
  }
};

let cameraReady = ref(false);
let blinked = ref(false);

onMounted(async () => {

  await router.isReady();
  currentIndex.value = 0;
});

async function initializeFaceApiAndVideoElements() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

  navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );

  navigator.getUserMedia(
    { video: {} },
    stream => {
      cameraFeedScreen.value.srcObject = stream;
      setupCameraOnPlayHandler();
    },
    err => console.error(err)
  );
}

function setupCameraOnPlayHandler() {
  let blinkCounter = 0;

  cameraFeedScreen.value.onplay = () => {
    cameraReady.value = true;

    intervalId.value = setInterval(async () => {
      if (cameraReady.value) {
        const detections = await faceapi.detectAllFaces(cameraFeedScreen.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

        if (detections.length) {
          const eyeStatus = getEyeStatus(detections[0].landmarks);

          if (eyeStatus === 'CLOSED') {
            backgroundColor.value = 'var(--c-red)';
            setTimeout(() => {
              // Reset the background color after a delay (e.g., 1 second)
              backgroundColor.value = 'var(--c-white)';
            }, 400);
          }
        }
      }
    }, 100);
  };
}

watch(route, () => {
  currentIndex.value = 0;
});

onUnmounted(() => {
  console.log('Component is unmounted');
  clearInterval(intervalId.value);
  if (cameraFeedScreen.value) {
    const tracks = cameraFeedScreen.value.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
  }
});

function getEyeStatus(landmarks) {
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const leftEAR = calculateEAR(leftEye);
  const rightEAR = calculateEAR(rightEye);

  const EAR_THRESHOLD_OPEN = 0.2905;
  const EAR_THRESHOLD_CLOSED = 0.277;

  if (leftEAR < EAR_THRESHOLD_CLOSED && rightEAR < EAR_THRESHOLD_CLOSED) {
    return 'CLOSED';
  }
  if (leftEAR > EAR_THRESHOLD_OPEN || rightEAR > EAR_THRESHOLD_OPEN) {
    return 'OPEN';
  }
  return 'UNCERTAIN';
}

function calculateEAR(eye) {
  const [p1, p2, p3, p4, p5, p6] = eye;
  const A = distance(p2, p6);
  const B = distance(p3, p5);
  const C = distance(p1, p4);
  const EAR = (A + B) / (2.0 * C);
  return EAR;
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}
</script>
  
<style scoped>
.screens {
  background-color: var(--c-white);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-container-screen {
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.infoText {
  color: var(--c-black);
  font-size: var(--t-header3);
  text-transform: uppercase;
  margin-bottom: 1rem;
  line-height: 2rem;
  font-family: var(--f-thin);
  width: 60vw;
}

h1 {
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-family: var(--f-thin);
  font-size: var(--t-header3);
}

.final-btn-container {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

.select-btn {
  font-family: var(--f-light);
  text-decoration: none;
  color: var(--c-black);
  font-size: var(--t-header3);
  cursor: url('../assets/cursor.png'), auto;
  border: 2px transparent solid;
  border-radius: 50%;
  padding: 1.2rem 1.8rem;
}

.select-btn:hover {
  border: 2px var(--c-red) solid;
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
  animation: blink 1s infinite;
  opacity: 1;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
    /* Fully visible */
  }

  50% {
    opacity: 0;
    /* Invisible */
  }
}

.camera-feed {
  position: absolute;
  top: 0;
  left: 0;
  width: 20rem;
  height: auto;
  object-fit: cover;
}
</style>
  