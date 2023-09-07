<template>
    <div class="grid-container">
      <div class="grid-item text-item">
        <h1 class="project-title">Project title</h1>
        <p>Text content on the left.</p>
      </div>
      <div class="grid-item image-item">
        <img :src="imageUrl" alt="Descriptive Image">
      </div>
      <div class="grid-item text-item text-right">
        <button class="button-back">Back</button>
        <p>Text content on the right.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const imageUrl = ref('https://via.placeholder.com/150');
  </script>
  
  <style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100vh;
    width: 100vw;
  }

  
  .text-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
  }

  .project-title {
    font-size: var(--t-header2);
    margin-bottom: 15px;
  }

  .text-right {
    text-align: right;
  }

  .button-back {
    margin-bottom: 15px;
  }
  
  .image-item img {
    height: 100vh;
    object-fit: cover;
  }
  </style>
  