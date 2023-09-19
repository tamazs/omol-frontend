<template>
  <div class="container">
    <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>
    <div v-if="cameraReady && countdown === 0" class="timer">{{ formattedTimer }}</div>
    <video v-if="countdown === 0" ref="videoElement" class="main-video" :src="videoSrc" loop muted playsinline></video>
    <video v-if="countdown === 0" ref="cameraFeed" class="camera-feed" autoplay muted playsinline></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import * as faceapi from 'face-api.js';
import { useRouter } from 'vue-router';

let videoSrc = ref('/video.mp4');
let videoElement = ref(null);
let cameraFeed = ref(null);
let intervalId = ref(null);
let timerInterval = ref(null);
const router = useRouter();

let countdown = ref(3);
let cameraReady = ref(false);
let timer = ref(0.0);

let formattedTimer = computed(() => {
  let milliseconds = Math.floor((timer.value * 1000) % 1000);
  let seconds = Math.floor(timer.value % 60);
  let minutes = Math.floor(timer.value / 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
});

onMounted(async () => {
  const countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(countdownInterval);
      initializeFaceApiAndVideoElements();
    }
  }, 1000);
});

async function initializeFaceApiAndVideoElements() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

  navigator.getUserMedia(
    { video: {} },
    stream => {
      cameraFeed.value.srcObject = stream;
      setupCameraOnPlayHandler();
    },
    err => console.error(err)
  );
}

function setupCameraOnPlayHandler() {
  let blinkCounter = 0;
  let isTimerStarted = false;

  cameraFeed.value.onplay = () => {
    cameraReady.value = true;
    videoElement.value.onplay = () => {
      if (!isTimerStarted) {
        // Reset and start the timer when the main video starts playing
        timer.value = 0.0;
        timerInterval.value = setInterval(() => {
          timer.value += 0.1;
        }, 100);
        isTimerStarted = true;
      }
    };

    videoElement.value.play();

    intervalId.value = setInterval(async () => {
      if (cameraReady.value) {
        const detections = await faceapi.detectAllFaces(cameraFeed.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

        if (detections.length) {
          const eyeStatus = getEyeStatus(detections[0].landmarks);
          console.log(eyeStatus);

          if (eyeStatus === 'OPEN' || eyeStatus === 'UNCERTAIN') {
            if (cameraReady.value && videoElement.value.paused) {
              videoElement.value.play();
            }
            blinkCounter = 0;
          }

          if (eyeStatus === 'CLOSED') {
            blinkCounter++;
            videoElement.value.pause();
            if (blinkCounter >= 1) {
              clearInterval(timerInterval.value);
              cameraFeed.value?.srcObject?.getTracks().forEach(track => track.stop());
              clearInterval(intervalId.value);
              router.push({ name: 'result', params: { timerValue: timer.value } });
            }
          }
        }
      }
    }, 100);
  };
}

onUnmounted(() => {
  clearInterval(intervalId.value);
  clearInterval(timerInterval.value);
  videoElement.value?.pause();
  cameraFeed.value?.srcObject?.getTracks().forEach(track => track.stop());
});

function getEyeStatus(landmarks) {
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const leftEAR = calculateEAR(leftEye);
  const rightEAR = calculateEAR(rightEye);
  console.log(`Left EAR: ${leftEAR}, Right EAR: ${rightEAR}`);

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

<style>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.countdown {
  font-size: 8rem;
  color: white;
  font-weight: bold;
}

.timer {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: white;
}

.main-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
