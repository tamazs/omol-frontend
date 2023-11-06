<template>
  <div class="text-container" ref="textContainer2">
    <p class="before-text">{{ $t('about.aboutText2Before') }}</p>
    <p class="text" ref="text"><span class="highlight2">{{ $t('about.aboutText21') }}</span><span class="highlight2">{{ $t('about.aboutText22') }}</span><span class="highlight2">{{ $t('about.aboutText23') }}</span>
      <span class="highlight2">
      {{ $t('about.aboutText24') }}</span>
      <br/>
      <br/>
      <span class="highlight2">
      {{ $t('about.aboutText2After') }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer2 = ref(null);

let tl2;

onMounted(() => {
  tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: textContainer2.value,
      start: 'center center-=400',
      end: 'bottom center-=400',
      scrub: true
    }
  });

  tl2.fromTo(
  ".highlight2",
  { color: "#CAC2BE" },
  { color: "black", stagger: 1 }
  );
});

onBeforeUnmount(() => {
// Kill the timeline and ScrollTrigger instance when the component is unmounted
ScrollTrigger.getAll().forEach(trigger => trigger.kill());
tl2.kill();
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
  padding: 6rem 15rem 3rem 3rem;
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
