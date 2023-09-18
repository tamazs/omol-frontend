<template>
  <div class="container">
    <video ref="videoElement" class="main-video" :src="videoSrc" controls autoplay></video>
    <video ref="cameraFeed" class="camera-feed" autoplay muted playsinline></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as faceapi from 'face-api.js';

let videoSrc = ref('/video.mp4');
let videoElement = ref(null);
let cameraFeed = ref(null);

onMounted(async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  
  navigator.getUserMedia(
    { video: {} },
    stream => (cameraFeed.value.srcObject = stream),
    err => console.error(err)
  );

  let blinkCounter = 0;

  cameraFeed.value.onplay = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(cameraFeed.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      
      if (detections.length) {
        const eyeStatus = getEyeStatus(detections[0].landmarks);
        console.log(eyeStatus);  // Log the eye status to see if it is detecting blinks correctly

        if (eyeStatus === 'OPEN' || eyeStatus === 'UNCERTAIN') {
          videoElement.value.play();
          blinkCounter = 0;
        } 
        if (eyeStatus === 'CLOSED') {
          blinkCounter++;
          videoElement.value.pause();
          if (blinkCounter >= 1) {  // Adjust this value to require more or fewer frames for a "blink"
            console.log('Blink detected'); // Reset the counter after logging a blink
          }
        }
      }
    }, 100);
  };
});

onUnmounted(() => {
  videoElement.value?.pause();
  cameraFeed.value?.srcObject?.getTracks().forEach(track => track.stop());
});

function getEyeStatus(landmarks) {
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  const leftEAR = calculateEAR(leftEye);
  const rightEAR = calculateEAR(rightEye);

  console.log(`Left EAR: ${leftEAR}, Right EAR: ${rightEAR}`);  // Log the EAR values to debug the issue

  const EAR_THRESHOLD_OPEN = 0.2905;  // Adjust based on testing for open state
  const EAR_THRESHOLD_CLOSED = 0.277;  // Adjust based on testing for closed state

  if (leftEAR < EAR_THRESHOLD_CLOSED && rightEAR < EAR_THRESHOLD_CLOSED) {
    return 'CLOSED';
  } 
  if (leftEAR > EAR_THRESHOLD_OPEN || rightEAR > EAR_THRESHOLD_OPEN) {
    return 'OPEN';
  } 
  return 'UNCERTAIN';  // Adds a new state to handle ambiguous cases
}

function calculateEAR(eye) {
  const [p1, p2, p3, p4, p5, p6] = eye;
  
  const A = distance(p2, p6);
  const B = distance(p3, p5);
  const C = distance(p1, p4);

  // EAR formula
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
  width: 200px;
  height: 150px;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
