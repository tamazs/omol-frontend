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
  // @ts-ignore
  import blink from 'blink-detection';
  
  const video = ref(null); // Reference to the video element
  const canvas = ref(null); // Reference to the canvas element
  
  onMounted(async () => {
    // Set up camera feed
    await initCamera();
  
    // Run blink detection predictions
    predictBlink();
  });
  
  const initCamera = async () => {
    await blink.loadModel();
    await blink.setUpCamera(video.value);
  };
  
  const predictBlink = async () => {
    const blinkPrediction = await blink.getBlinkPrediction();
  
    // Log blink prediction
    console.log('Blink Prediction:', blinkPrediction);
  
    if (blinkPrediction.blink) {
      console.log('Blink detected')
    }
  
    // Run the prediction in the next animation frame
    requestAnimationFrame(predictBlink);
  };
  </script>
  
  <style scoped>
  /* Your styling here */
  </style>
  