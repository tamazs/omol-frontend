<template>
  <div>
    <!-- Video element to display the webcam stream -->
    <video ref="video" width="720" height="560" autoplay muted></video>
    <!-- Canvas element to draw face detection results -->
    <canvas ref="canvas" width="720" height="560"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as faceapi from 'face-api.js';

const video = ref(null); // Reference to the video element
const canvas = ref(null); // Reference to the canvas element
let prevLeftEye; // Variable to store the previous left eye state
let prevRightEye; // Variable to store the previous right eye state

onMounted(() => {
  const modelsPath = '/models'; // Path to the models directory in the public folder

  // Load the required models
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath),
    faceapi.nets.faceExpressionNet.loadFromUri(modelsPath),
  ]).then(startVideo);
});

const startVideo = () => {
  // Get webcam stream and play it in the video element
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.value.srcObject = stream;
      video.value.play();
      detectFaces(); // Start detecting faces after video starts
    })
    .catch(err => console.error(err));
};

const detectFaces = async () => {
  if (!video.value.srcObject) {
    return; // Exit if video stream is not ready
  }

  const displaySize = { width: video.value.width, height: video.value.height };
  faceapi.matchDimensions(canvas.value, displaySize);

  // Perform face detection and expression recognition
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video.value, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    // Resize the detection results to match canvas dimensions
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // Get the canvas context for drawing
    const context = canvas.value.getContext('2d');
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // Draw face detection, landmarks, and expressions
    faceapi.draw.drawDetections(canvas.value, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas.value, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas.value, resizedDetections);

    // Detect blinking eyes
    detectBlinkingEyes(resizedDetections[0]);
  }, 100);
};

const detectBlinkingEyes = (detection) => {
  if (!detection) {
    return;
  }

  const landmarks = detection.landmarks.positions;

  const leftEye = landmarks.slice(42, 48); // Indices for left eye landmarks
  const rightEye = landmarks.slice(36, 42); // Indices for right eye landmarks

  // Check for blink in both eyes
  if (isBlinking(leftEye) && isBlinking(rightEye)) {
    console.log('Blink detected!');
  }

  // Store current eye states for the next iteration
  prevLeftEye = leftEye;
  prevRightEye = rightEye;
};

let leftEyeClosureHistory = [];
let rightEyeClosureHistory = [];
const historyLength = 1; // Number of frames for history

const isBlinking = (eyeLandmarks) => {
  if (!eyeLandmarks || !prevLeftEye || !prevRightEye) {
    return false; // Not enough data for comparison
  }

  const currentEyeHeight = eyeLandmarks[3][1] - eyeLandmarks[1][1]; // Y coordinates of landmarks
  const prevEyeHeight = prevLeftEye[3][1] - prevLeftEye[1][1];

  leftEyeClosureHistory.push(currentEyeHeight < prevEyeHeight);
  rightEyeClosureHistory.push(currentEyeHeight < prevEyeHeight);

  // Keep history length in check
  if (leftEyeClosureHistory.length > historyLength) {
    leftEyeClosureHistory.shift();
  }
  if (rightEyeClosureHistory.length > historyLength) {
    rightEyeClosureHistory.shift();
  }

  // Check if there's a sequence of closed eyes in history
  return (
    leftEyeClosureHistory.every((closed) => closed) &&
    rightEyeClosureHistory.every((closed) => closed)
  );
};




onMounted(detectFaces);
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
