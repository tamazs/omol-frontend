<template>
  <div class="hero-container">
    <LogoMarqueeSection />
    <div class="scroll-down">{{ $t('home.scrollDown') }}</div>
    <div class="video-container" ref="videoContainer" @click="toggleVideoPlay">
      <video v-if="viewportWidth >= 1000" ref="videoHeroElement" class="video" @ended="handleVideoEnd" playsinline>
        <source src="/video.mp4" type="video/mp4">
      </video>
      <video
      v-else
      autoplay
      muted
      loop
      playsinline
      class="video"
      ref="videoHeroElement"
    >
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

const videoHeroElement = ref(null);
const videoContainer = ref(null);
const isVideoPaused = ref(true);
const viewportWidth = ref(window.innerWidth);

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
  window.addEventListener('resize', updateViewportWidth);
  /* videoContainer.value.addEventListener('click', handleVideoClick); */
});

const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth;
};

const handleVideoEnd = () => {
  videoHeroElement.value.pause();
};

const toggleVideoPlay = () => {
  if (videoHeroElement.value.paused) {
    videoHeroElement.value.play();
    isVideoPaused.value = false;
  } else {
    videoHeroElement.value.pause();
    isVideoPaused.value = true;
  }
};

/* const handleVideoClick = () => {
  if (!isVideoPaused.value) {
    gsap.to(videoContainer.value, {
      width: '100vw',
      height: '100vh',
      duration: 0.5, // Adjust the duration as needed for the animation speed
    });
  }
}; */

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
  bottom: 20%;
  font-size: var(--t-body);
  z-index: 2;
  text-transform: uppercase;
  font-family: var(--f-light);
  animation: blink 1s infinite;
  opacity: 1;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
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
  object-fit: cover;
}
</style>
