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

  function getContainerWidth() {
  // Calculate the total width based on the number of slides and their widths
  const slides = scrollContainer.value.querySelectorAll('.slide');
  return [...slides].reduce((totalWidth, slide) => totalWidth + slide.offsetWidth, 0);
}

function setContainerWidth(width) {
  scrollContainer.value.style.width = `${width}px`; // Set the width in pixels
}
  
  onMounted(() => {
    const containerWidth = getContainerWidth(); // Calculate the total width of the container
  setContainerWidth(containerWidth); // Set the width dynamically
  gsap.to(scrollContainer.value, {
    x: -(containerWidth - window.innerWidth),
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
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-family: var(--f-thin);
  }
  
  .horizontal-scroll {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: #E8E3E0;
  }
  
  .scroll-container {
    display: flex;
    height: 100%;
    width: max-content;
    gap: 20px;
    justify-content: center;
  }
  
  .slide {
    width: 70vw;
    padding: 2rem 2rem 0rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .number {
    color: #F0444A;
    font-size: 17rem;
    font-family: var(--f-thin);
  }
  
  .history-text {
    font-size: 1.3rem;
    width: 75%;
    font-family: var(--f-thin);
  }
  
  .history-title {
    font-size: var(--t-header1);
    text-transform: uppercase;
    text-wrap: nowrap;
    font-family: var(--f-thin);
    margin-bottom: 0rem;
  }
  
  .history {
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 767px) {
    
    .slide {
    width: 100vw !important;
    gap: 40px !important;
    padding: 5rem 2rem 0rem 2rem !important;
    flex-direction: column !important;
  }
  
  .number {
    font-size: 8rem !important;
  }
  
  .history-text {
    font-size: var(--t-body) !important;
    width: 100% !important;
  }
  
  .history-title {
    font-size: var(--t-header2) !important;
    margin-bottom: 1rem !important;
  }

  .scroll-container {
    gap: 5px !important;
  }
  }
  </style>
  
  