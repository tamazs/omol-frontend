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
  padding: 0;
  width: 100vw;
  min-height: 20vh;
  margin: 0 auto;
  font-size: var(--t-header3);
  line-height: 1.6;
  overflow: hidden;
  background-color: var(--c-red);
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

p {
  z-index: 2;
  color: var(--c-white);
  text-transform: uppercase;
  padding: 0;
}

@media(max-width: 767px) {
  .short-about-content {
  font-size: var(--t-body);
}
}

  </style>
  