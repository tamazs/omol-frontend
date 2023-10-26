<template>
    <div class="text-container" ref="textContainer">
      <p class="before-text">{{ $t('home.textHighlightBefore') }}</p>
      <p class="text" ref="text"><span class="highlight">{{ $t('home.textHighlightSpan1') }}</span><span class="highlight">{{ $t('home.textHighlightSpan2') }}</span><span class="highlight">{{ $t('home.textHighlightSpan3') }}</span>
        <br>
        <br>
        <span class="highlight">
        {{ $t('home.textHighlightSpan4') }}</span><span class="highlight"> 
        {{ $t('home.textHighlightSpan5') }}</span><span class="highlight">{{ $t('home.textHighlightSpan6') }}</span></p>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer = ref(null);

let tl;

onMounted(() => {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainer.value,
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    });

    tl.fromTo(
    ".highlight",
    { color: "black" },
    { color: "red", stagger: 1 }
    );
  });

  onBeforeUnmount(() => {
  // Kill the timeline and ScrollTrigger instance when the component is unmounted
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  tl.kill();
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
    width: 80vw !important;
  }
  }
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-bigText);
    background-color: var(--c-white);
    position: relative;
    padding: 4rem 0rem;
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
    width: 20vw;
  }

  .before-text::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #F0444A;
  border-radius: 50%;
  position: absolute;
  left: 1.5rem;
  top: 4.1rem;
  z-index: 2;
  line-height: 0px;
}
  </style>
  