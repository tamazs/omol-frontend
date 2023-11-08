<template>
  <section class="about-marquee">
    <div class="about-marquee__inner" aria-hidden="true" ref="inner">
      <div class="about-marquee__part">
        {{ $t('about.marqueeText') }}
      </div>
      <div class="about-marquee__part">
        {{ $t('about.marqueeText') }}
      </div>
      <div class="about-marquee__part">
        {{ $t('about.marqueeText') }}
      </div>
      <div class="about-marquee__part">
        {{ $t('about.marqueeText') }}
      </div>
    </div>
  </section>
</template>
    
<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  let currentScroll = 0;
  let isScrollingDown = true;

  let tween = gsap.to(".about-marquee__part", {
    xPercent: -100,
    repeat: -1,
    duration: 20,
    ease: "linear"
  }).totalProgress(0.5);

  gsap.set(".about-marquee__inner", {
    xPercent: -50
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > currentScroll) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1
    });

    currentScroll = window.scrollY;
  });
});
</script>
    
<style>
.about-marquee__part {
  flex-shrink: 0;
  padding: 0 25px;
  font-smooth: always;
  font-size: 5rem;
  font-family: var(--f-thin);
}

.about-marquee {
  background: var(--c-white);
  color: var(--c-red);
  text-transform: uppercase;
  padding: 32px 0;
  position: relative;
  overflow: hidden;
}

.about-marquee__inner {
  -webkit-font-smoothing: antialiased;
  width: fit-content;
  display: flex;
  flex: auto;
  flex-direction: row;
}

@media(max-width: 767px) {
  .about-marquee__part {
    padding: 0 10px;
    font-size: var(--t-header1);
  }
}
</style>
    