<template>
    <div class="outer-container" ref="outerContainer">
      <div class="static-text">{{ $t('home.storiesTitle') }}</div>
      <section ref="horizontalScroll" class="horizontal-scroll">
        <div class="scroll-container" ref="scrollContainer">
        <div class="slide">
            <h1 class="number">01</h1>
            <div class="history">
                <h2 class="history-title">{{ $t('home.storiesTitle1') }}</h2>
                <p class="history-text">{{ $t('home.storiesText1') }}</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">02</h1>
            <div class="history">
                <h2 class="history-title">{{ $t('home.storiesTitle2') }}</h2>
                <p class="history-text">{{ $t('home.storiesText2') }}</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">03</h1>
            <div class="history">
                <h2 class="history-title">{{ $t('home.storiesTitle3') }}</h2>
                <p class="history-text">{{ $t('home.storiesText3') }}</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">04</h1>
            <div class="history">
                <h2 class="history-title">{{ $t('home.storiesTitle4') }}</h2>
                <p class="history-text">{{ $t('home.storiesText4') }}</p>
            </div>
        </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);

  const { homeContainer } = defineProps(['homeContainer']);
  
  const scrollContainer = ref(null);
  const outerContainer = ref(null);
  
  onMounted(() => {

  gsap.to(scrollContainer.value, {
    x: "-75%",
    ease: "none",
    scrollTrigger: {
      trigger: outerContainer.value,
      scroller: homeContainer,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      start: "top top",
      end: "bottom center",
    }
  });
});
  </script>
  
  <style scoped>
  .outer-container {
    position: relative;
    width: 100%;
    height: 100vh;
    font-family: var(--f-thin);
  }
  
  .static-text {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    font-size: var(--t-header2);
    text-align: center;
    text-transform: uppercase;
  }
  
  .horizontal-scroll {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: var(--c-white);
  }
  
  .scroll-container {
    display: flex;
    height: 100%;
    width: 240%; /* Adjust for the number of slides you want */
    gap: 20px;
  }
  
  .slide {
    width: 60%;
    padding: 2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
  }
  
  .number {
    color: var(--c-red);
    font-size: 12rem;
  }
  
  .history-text {
    font-size: var(--t-body);
    width: 80%;
  }
  
  .history-title {
    font-size: var(--t-header1);
    text-transform: uppercase;
  }
  
  .history {
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 767px) {
    .scroll-container {
      width: 200%; /* Adjust for the number of slides you want */
    }
  
    .number {
      font-size: 8rem;
      padding: 1rem;
    }
  
    .history-title {
      font-size: var(--t-header3);
    }
  }
  </style>
  
  