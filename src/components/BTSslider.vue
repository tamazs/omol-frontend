<template>
    <swiper
      :slidesPerView="slidesPerView"
      :spaceBetween="10"
      :navigation="false"
      :scrollbar="true"
      :modules="modules"
      class="aboutSwiper"
      v-if="pState.projects[0]"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="about-swiper-slide">
        <div class="about-image-wrapper">
          <img class="about-base-image" :src="slide" />
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/scrollbar';
  import { Navigation, Scrollbar } from 'swiper/modules';
  import project from '../modules/project';
  
  const { pState, getSingleProject } = project()
  
  const slides = computed(() => pState.projects[0].btsImages);
  
  const slidesPerView = ref(window.innerWidth <= 767 ? 1 : 4);
  
  const updateSlidesPerView = () => {
    slidesPerView.value = window.innerWidth <= 767 ? 1 : 4;
  };
  
  onMounted(() => {
    getSingleProject();
  
    window.addEventListener('resize', updateSlidesPerView);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSlidesPerView);
  });
  
  const modules = [Navigation, Scrollbar];
  </script>
  
  <style scoped lang="scss">
  .aboutSwiper {
    max-width: 100%;
    height: 100%;
    background-color: var(--c-white);
    padding: 0 1rem;
    margin-bottom: 7rem;
    cursor: grab;
  }
  
  .about-swiper-slide {
    font-size: 18px;
    background: var(--c-white);
    display: grid;
    place-items: center;
    max-width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    grid-template-rows: 1fr;
    width: auto;
  }
  
  .about-image-wrapper {
    position: relative;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh; /* Set your desired fixed height here */
    margin-bottom: 85px; /* Adjust the margin as needed */
  }
  
  .about-base-image {
    max-width: 100%; /* Ensure the image doesn't exceed its container */
    height: 100%; /* Maintain a consistent height */
    object-fit: cover;
  }
  </style>
  