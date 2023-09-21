<template>
    <div class="outer-container" ref="outerContainer">
      <div class="static-text">Contamos historias</div>
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
      <div class="progress-container">
        <div class="progress-bar" ref="progressBar"></div>
      </div>
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
  const progressBar = ref(null);
  
  onMounted(() => {

  gsap.to(scrollContainer.value, {
    x: "-75%",
    ease: "none",
    scrollTrigger: {
      trigger: outerContainer.value,
      scroller: homeContainer,
      pin: true,
      pinSpacing: 'none',
      scrub: 1,
      start: "top top",
      end: "bottom center",
      onUpdate: self => {
                // Update progress bar's width based on the scroll position
                const progress = self.progress;
                progressBar.value.style.width = `${progress * 100}%`;
            }
    }
  });
});
  </script>
  
  <style scoped>

.outer-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.progress-container {
    position: absolute;
    bottom: 20px;
    padding: 0 60px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--c-white);
    z-index: 6;
    border: 1px transparent solid;
    border-radius: 50px;
}

.progress-bar {
    width: 0;
    height: 100%;
    background: var(--c-red);
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
  