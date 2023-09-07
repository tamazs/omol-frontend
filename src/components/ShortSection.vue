<template>
    <div class="short-about-content">
      <div class="text-container">
        <p>Compartir al momento, hablar con tu audiencia, contarles lo que haces casi en tiempo real es algo que está aquí.</p>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  
  <style scoped>
    .short-about-content {
  position: relative;
  padding: 20px;
  width: 100vw;
  height: 20vh;
  margin: 0 auto;
  font-size: var(--t-header3);
  line-height: 1.6;
  overflow: hidden;
  background-color: var(--c-red);
}

.text-container {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

p {
  z-index: 2;
  color: var(--c-white);
  text-transform: uppercase;
  padding: 2rem 0;
}

  </style>
  