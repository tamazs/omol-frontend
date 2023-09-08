<template>
  <div class="grid-container">
    <div class="grid-item text-item left-text">
      <h1 class="project-title">Project title</h1>
      <p>Text content on the left.</p>
    </div>
    <div class="grid-item image-item">
      <img :src="imageUrl" alt="Descriptive Image">
    </div>
    <div class="grid-item text-item text-right">
      <i class="fas fa-x"></i>
      <p>Text content on the right.</p>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 
    "left image right";
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.text-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.left-text {
  grid-area: left;
}

.project-title {
  font-size: var(--t-header2);
  margin-bottom: 15px;
}

.image-item {
  grid-area: image;
}

.image-item img {
  height: 100vh;
  object-fit: cover;
  width: 100%;
}

.text-right {
  grid-area: right;
  text-align: right;
  position: relative;
}

.text-right i {
  font-size: 18px;
  margin-bottom: 15px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    grid-template-areas: 
      "image image"
      "left right";
  }

  .image-item {
    height: 50vh;
  }
  .image-item img {
    height: 100%;
  }

  .text-item {
    justify-content: flex-start;
    height: 50vh;
  }
}
</style>

<script setup>
import { ref } from 'vue';

const imageUrl = ref('https://via.placeholder.com/150');
</script>
  