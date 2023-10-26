<template>
    <div class="text-container" ref="textContainer">
      <p class="before-text">{{ $t('about.aboutText1Before') }}</p>
      <p class="text">{{ $t('about.aboutText1') }}</p>
    </div>
  </template>
  
<script setup>

</script>
  
  <style scoped lang="scss">
@media (max-width: 767px) {
    .text-container .text {
    padding: 5rem 2rem 2rem 2rem !important;
  }

  .text-container {
    font-size: var(--t-header2) !important;
  }

  .before-text {
    width: 65vw !important;
  }
  }
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-bigText);
    background-color: var(--c-white);
    position: relative;
    margin-top: 10rem;
  }
  
  .text-container .text {
    padding: 6rem 5rem 10rem 3rem;
    font-family: var(--f-thin);
    line-height: 3rem;
  }

  .before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0 3rem;
    width: 17vw;
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
  