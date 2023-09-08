<template>
    <div>
      <section ref="horizontalScroll" class="horizontal-scroll">
        <div class="scroll-container" ref="scrollContainer">
        <div class="slide">
            <h1 class="number">01</h1>
            <div class="history">
                <h2 class="history-title">TV + CINE</h2>
                <p class="history-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">02</h1>
            <div class="history">
                <h2 class="history-title">25 ANOS</h2>
                <p class="history-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">03</h1>
            <div class="history">
                <h2 class="history-title">TV + CINE</h2>
                <p class="history-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
        <div class="slide">
            <h1 class="number">04</h1>
            <div class="history">
                <h2 class="history-title">25 ANOS</h2>
                <p class="history-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
  
  const horizontalScroll = ref(null);
  const scrollContainer = ref(null);
  
  onMounted(() => {
  const horizontalScrollElement = horizontalScroll.value;

  gsap.to(scrollContainer.value, {
    x: "-75%",
    ease: "none",
    scrollTrigger: {
      trigger: horizontalScrollElement,
      scroller: homeContainer,
      pin: true,
      scrub: 1,
      start: "top top",
      end: "bottom center"
    }
  });
});
  </script>
  
  <style scoped>
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
  width: 200%;
    }

.slide {
    width: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

  .history-text {
    display: flex;
    font-size: var(--t-body);
    flex-wrap: nowrap;
  }

  .number {
    color: var(--c-red);
    font-size: 12rem;
    padding: 1rem;
  }

  .history-title {
    font-size: var(--t-header2);
  }

  .history {
    display: flex;
    flex-direction: column;
  }

  @media(max-width: 767px) {

    .scroll-container {
  width: 300%;
    }
    .number {
    color: var(--c-red);
    font-size: 8rem;
    padding: 1rem;
  }

  .history-title {
    font-size: var(--t-header3);
  }
}
  </style>
  