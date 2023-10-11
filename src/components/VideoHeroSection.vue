<template>
  <div class="hero-container">
    <LogoMarqueeSection/>
    <div class="scroll-down">{{ $t('home.introText') }}</div>
    <div class="video-container"
         ref="videoContainer"
         @click="toggleVideoPlay">
      <video ref="videoElement" class="video" @ended="handleVideoEnd">
          <source src="/video.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script setup>
import LogoMarqueeSection from './LogoMarqueeSection.vue';
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videoElement = ref(null);
const videoContainer = ref(null);
const isVideoPaused = ref(true);

onMounted(() => {
  gsap.fromTo(videoContainer.value, 
    { width: '0px', height: '0px' },
    {
      width: '100vw',
      height: '100vh',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        scrub: true,
        pin: true
      }
    }
  );
});

const handleVideoEnd = () => {
  videoElement.value.pause();
};

const toggleVideoPlay = () => {
  if (videoElement.value.paused) {
    videoElement.value.play();
    isVideoPaused.value = false;
  } else {
    videoElement.value.pause();
    isVideoPaused.value = true;
  }
};

watch(
  () => isVideoPaused.value,
  (paused) => {
    if (!videoContainer.value) return;

    if (paused) {
      videoContainer.value.style.cursor = `url('/play.png'), default`;
    } else {
      videoContainer.value.style.cursor = `url('/pause.png'), default`;
    }
  },
  { immediate: true }
);

</script>

<style>
@font-face {
  font-family: Narnia;
  src: url("/font/Narnia.otf") format("opentype");
}

.hero-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--c-white);
}

.title {
  font-size: 16rem;
  text-align: center;
  z-index: 2;
  font-family: 'Narnia', serif;
  text-transform: uppercase;
}

.scroll-down {
  position: absolute;
  bottom: 15%;
  font-size: 14px;
  z-index: 2;
  text-transform: uppercase;
  font-family: var(--f-light);
}

.video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0px;
  height: 0px;
  transform: translate(-50%, -50%);
  border: none;
  z-index: 3;
  overflow: hidden;
  cursor: url('/play.png'), default;
}

.video {
  width: 100%;
  height: 100%;
}
</style>
