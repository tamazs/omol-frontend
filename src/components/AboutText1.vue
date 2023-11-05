<template>
  <div class="text-container" ref="textContainer1">
    <p class="before-text">{{ $t('about.aboutText1Before') }}</p>
    <p class="text" ref="text"><span class="highlight1">{{ $t('about.aboutText11') }}</span><span class="highlight1">{{ $t('about.aboutText12') }}</span><span class="highlight1">{{ $t('about.aboutText13') }}</span>
      <span class="highlight1">
      {{ $t('about.aboutText14') }}</span></p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer1 = ref(null);

let tl;

onMounted(() => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: textContainer1.value,
      start: 'top center',
      end: 'center center',
      scrub: true
    }
  });

  tl.fromTo(
  ".highlight1",
  { color: "#CAC2BE" },
  { color: "black", stagger: 1 }
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
  top: 0.07rem;
  z-index: 2;
  line-height: 0px;
}
</style>
