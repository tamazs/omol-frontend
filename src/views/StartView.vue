<template>
  <div class="start">
    <!-- Video element with fade-out effect -->
    <div class="background-div"></div>
    <video class="intro-video" autoplay muted playsinline>
      <source src="/preloader2.mp4" type="video/mp4" />
    </video>

    <!-- Content with fade-in effect -->
    <div v-if="showContent" class="intro">
      <h1>{{ $t('intro.question') }}</h1>
      <p>{{ $t('intro.text1') }}</p>
      <div class="start-select">
        <RouterLink class="select-btn" to="/screens" @mouseenter="playSound" @mouseleave="stopSound">{{ $t('intro.button1') }}</RouterLink>
        <RouterLink class="select-btn" to="/home" @mouseenter="playSound" @mouseleave="stopSound">{{ $t('intro.button2') }}</RouterLink>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import tickSound from '@/assets/tick3.mp3';

const showContent = ref(false);

onMounted(() => {
  const videoElement = document.querySelector('.intro-video');
  videoElement.onended = onVideoEnded;
  videoElement.play();
});

const onVideoEnded = () => {
  // Use GSAP to fade in the content
  gsap.to('.intro-video', { opacity: 0, duration: 1 });
  showContent.value = true;
  gsap.to('.intro', { opacity: 1, duration: 1 });
};

const audio = new Audio(tickSound);

const playSound = () => {
  audio.play();
};

const stopSound = () => {
  audio.pause();
  audio.currentTime = 0;
};
</script>
  
<style lang="scss" scoped>
.start {
  background-color: var(--c-white);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7rem;
  z-index: 99999;
}


.background-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f3eeeb;
  /* Change the background color to what you prefer */
  z-index: 1;
  /* Behind the video */
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

h1 {
  font-family: var(--f-thin);
  text-transform: uppercase;
  font-size: 50px;
  margin-bottom: 4rem;
}

p {
  font-family: var(--f-light);
  text-transform: uppercase;
  font-size: var(--t-header3);
  margin-bottom: 4rem;
  width: 40vw;
  text-align: center;
}

.start-select {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

.select-btn {
  font-family: var(--f-light);
  text-decoration: none;
  color: var(--c-black);
  font-size: var(--t-header3);
  cursor: url('../assets/cursor.png'), auto;
  border: 2px transparent solid;
  border-radius: 50%;
  padding: 1.2rem 1.8rem;
}

.select-btn:hover {
  border: 2px var(--c-red) solid;
}

.intro-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  /* Make the video background transparent */
  z-index: 2;
}
</style>
  