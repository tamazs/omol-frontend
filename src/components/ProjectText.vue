<template>
  <div class="text-container" ref="textContainer3">
    <p class="before-text">{{ $t('projects.projectTextBefore') }}</p>
    <p class="text" ref="text"><span class="highlight3">{{ $t('projects.projectText1') }}</span><span class="highlight3">{{ $t('projects.projectText2') }}</span><span class="highlight3">{{ $t('projects.projectText3') }}</span></p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer3 = ref(null);

let tl3;

onMounted(() => {
  tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: textContainer3.value,
      start: 'center center-=50',
      end: 'bottom center-=50',
      scrub: true
    }
  });

  tl3.fromTo(
  ".highlight3",
  { color: "#CAC2BE" },
  { color: "black", stagger: 1 }
  );
});

onBeforeUnmount(() => {
// Kill the timeline and ScrollTrigger instance when the component is unmounted
ScrollTrigger.getAll().forEach(trigger => trigger.kill());
tl3.kill();
});
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
    padding: 6rem 15rem 10rem 3rem;
    line-height: 3rem;
    font-family: var(--f-thin);
  }

  .before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0 3rem;
    width: 18vw;
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
  animation: blink 1s infinite;
  opacity: 1;
  }

  @keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  }
  </style>
  