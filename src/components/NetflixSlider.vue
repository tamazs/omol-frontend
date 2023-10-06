<template>
    <swiper
      :slidesPerView="slidesPerView"
      :spaceBetween="0"
      :navigation="false"
      :scrollbar="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="card">
          <div class="title">
            <p>{{ slide.title }}</p>
          </div>
          <div class="image-wrapper" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
            <img class="base-image" :src="slide.img" />
            <img class="hover-gif" :src="slide.gif" :class="{ playing: playStatus[index] }" />
          </div>
          <div class="button-container" :class="{ active: cardHovered[index] }">
            <button class="play-button" @click="togglePlay(index)"><i :class="playIcon(index)"></i></button>
            <router-link :to="`/project/${slide.id}`" class="plus-button"><i class="fas fa-circle-plus"></i></router-link>
            <button class="close-button"><i class="fas fa-circle-xmark"></i></button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <style scoped>
  .mySwiper {
    width: 100%;
    height: 100%;
    background-color: var(--c-white);
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: var(--c-white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    overflow: hidden;
    position: relative;
  }
  
  .card {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
  }
  
  .title {
    font-size: var(--t-header2);
    margin-bottom: 10px;
    font-family: 'HelveticaNeue', serif;
  }
  
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }
  
  .base-image,
  .hover-gif {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .hover-gif {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }
  
  .button-container {
    display: none;
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: -50px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    z-index: 2;
  }
  
  .card:hover .button-container {
    display: flex;
    background: transparent;
  }
  
  .play-button,
  .plus-button,
  .close-button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 30px;
    color: red;
    margin: 0 10px;
  }
  
  .play-button:hover,
  .plus-button:hover,
  .close-button:hover {
    color: #e50914;
  }
  
  .hover-gif.playing {
    opacity: 1;
  }
  
  .active .button-container {
    display: flex;
    background: transparent;
  }
  </style>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import { gsap } from 'gsap';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/scrollbar';
  import { Navigation, Scrollbar } from 'swiper/modules';
  import project from '../modules/project';
  
  const { pState, getProjects } = project();
  
  const slides = computed(() => pState.projects);
  
  const slidesPerView = ref(window.innerWidth <= 767 ? 1 : 4);
  
  const updateSlidesPerView = () => {
    slidesPerView.value = window.innerWidth <= 767 ? 1 : 4;
  };
  
  onMounted(() => {
    getProjects();
  
    window.addEventListener('resize', updateSlidesPerView);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSlidesPerView);
  });
  
  const playStatus = ref(Array(slides.value.length).fill(false));
  
  const cardHovered = ref(Array(slides.value.length).fill(false));
  
  const handleMouseEnter = (index) => {
    cardHovered[index] = true;
  };
  
  const handleMouseLeave = (index) => {
    cardHovered[index] = false;
  };
  
  const togglePlay = (index) => {
    playStatus.value[index] = !playStatus.value[index];
    const gif = document.querySelectorAll(".hover-gif")[index];
    if (playStatus.value[index]) {
      gsap.to(gif, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(gif, { opacity: 0, duration: 0.5 });
    }
  };
  
  const playIcon = (index) => {
    return playStatus.value[index] ? "fas fa-circle-pause" : "fas fa-circle-play";
  };
  
  const navigateToProject = (projectId) => {
    // Implement your navigation logic here
    console.log(`Navigate to project with ID: ${projectId}`);
  };
  
  const modules = [Navigation, Scrollbar];
  </script>
  