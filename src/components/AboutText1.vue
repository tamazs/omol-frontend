<template>
    <div class="text-container" ref="textContainer">
      <p class="before-text">{{ $t('about.aboutText1Before') }}</p>
      <p class="text">{{ $t('about.aboutText1') }}</p>
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
    font-family: var(--f-thin);
    line-height: 4rem;
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
  