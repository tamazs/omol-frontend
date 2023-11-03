<template>
    <div class="start">
      <!-- Video element with fade-out effect -->
      <video class="intro-video" autoplay muted playsinline>
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
  
      <!-- Content with fade-in effect -->
      <div v-if="showContent" class="intro">
        <h1>{{ $t('intro.question') }}</h1>
        <p>{{ $t('intro.text1') }}</p>
        <div class="start-select">
          <RouterLink class="select-btn" to="/screens">{{ $t('intro.button1') }}
            <svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="190" height="72" viewBox="0 0 190 72" fill="none">
            <path class="path" d="M95.1236 70.5249C146.554 70.5249 188.247 55.1851 188.247 36.2625C188.247 17.3399 146.554 2 95.1236 2C43.6929 2 2 17.3399 2 36.2625C2 55.1851 43.6929 70.5249 95.1236 70.5249Z" stroke="#ED1C24" stroke-width="2.63557" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </RouterLink>
          <RouterLink class="select-btn" to="/home">{{ $t('intro.button2') }}
            <svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="190" height="72" viewBox="0 0 190 72" fill="none">
              <path class="path" d="M95.1236 70.5249C146.554 70.5249 188.247 55.1851 188.247 36.2625C188.247 17.3399 146.554 2 95.1236 2C43.6929 2 2 17.3399 2 36.2625C2 55.1851 43.6929 70.5249 95.1236 70.5249Z" stroke="#ED1C24" stroke-width="2.63557" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  
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
    margin-bottom: 20px;
  }
  
  p {
    font-family: var(--f-light);
    text-transform: uppercase;
    font-size: 20px;
    margin-bottom: 4rem;
    width: 33vw;
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
    cursor:url('../assets/cursor.png'), auto;
  }
  
  .intro-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f3eeeb;
  }

  .path {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
}

.select-btn:hover .path {
  transition: 2s;
  stroke-dashoffset: 0;
}

.svg1 {
  position: absolute;
  top: 56%;
  left: 48%;
  transform: translate(-93%, 30%);
}

.svg2 {
  position: absolute;
  top: 56%;
  left: 61%;
  transform: translate(-93%, 30%);
}
  </style>
  