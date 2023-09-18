<template>
    <div class="grid-container">
      <div class="grid-item text-section left-section">
        <RouterLink class="result-button" to="/">Try again</RouterLink>
      </div>
      <div class="grid-item middle-section">
        <div class="text-container">
          <h1 class="result-title">You were focused for</h1>
          <p class="time">00:23:23</p>
          <p class="result-desc">you were focused for one minute! this is really complicated nowadays</p>
        </div>
      </div>
      <div class="grid-item text-section right-section">
        <RouterLink class="result-button" to="/home">Go to site</RouterLink>
      </div>
    </div>
  </template>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 
      "left middle right";
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: var(--c-red);
    color: var(--c-black);
  }
  
  .text-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    text-transform: uppercase;
  }
  
  .left-section {
    grid-area: left;
    text-align: center;
  }
  
  .middle-section {
    grid-area: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-transform: uppercase;
    text-align: center;
  }
  
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
  
  .right-section {
    grid-area: right;
    text-align: center;
    position: relative;
  }

  .result-title {
    font-size: var(--t-header1);
  }

  .time {
    font-size: var(--t-header1);
    border: 3px var(--c-black) solid;
    border-radius: 100px;
    padding: 0.3rem 7rem;
  }

  .result-button {
    text-decoration: none;
    color: var(--c-black);
    border: 3px var(--c-black) solid;
    border-radius: 25px;
  }
  
  @media (max-width: 767px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto auto;
      grid-template-areas: 
        "middle middle"
        "left right";
    }
  
    .middle-section {
      height: 50vh;
    }
  
    .text-section {
      justify-content: flex-start;
      height: 50vh;
    }
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  </script>
  