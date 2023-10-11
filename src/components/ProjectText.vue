<template>
    <div class="text-container" ref="textContainer">
      <p class="before-text">We work harder and harder!</p>
      <p class="text">We want to show our beloved work and if you want to be the next, don't think twice!</p>
    </div>
  </template>
  
<script setup>

</script>
  
  <style scoped lang="scss">
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-header1);
    background-color: var(--c-white);
    position: relative;
    margin-top: 10rem;
  }
  
  .text-container .text {
    padding: 6rem 3rem 10rem 3rem;
    line-height: 50px;
  }

  .before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0 3rem;
  }

  .before-text::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #F0444A;
  border-radius: 50%;
  position: absolute;
  left: 1.5rem;
  top: 0.07rem;
  z-index: 2;
  line-height: 0px;
}
  </style>
  