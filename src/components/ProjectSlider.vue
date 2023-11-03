<template>
  <swiper
    :slidesPerView="slidesPerView"
    :spaceBetween="10"
    :navigation="false"
    :scrollbar="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
      <div class="image-wrapper" @mouseenter="handleMouseEnter($event)" @mouseleave="handleMouseLeave($event)">
        <img class="base-image" :src="slide.img" />
        <img class="hover-gif" :src="slide.gif" />
        <div class="text-overlay">
          <router-link class="overlay-open" :to="`/project/${slide.id}`">
          <p class="title">{{ slide.title }}</p>
          </router-link>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';
import project from '../modules/project';

const { pState, getProjects, latestProjects } = project()

const slides = computed(() => pState.projects);

const slidesPerView = ref(window.innerWidth <= 767 ? 1 : 4);

const updateSlidesPerView = () => {
  slidesPerView.value = window.innerWidth <= 767 ? 1 : 4;
};

onMounted(() => {
  latestProjects();

  window.addEventListener('resize', updateSlidesPerView);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSlidesPerView);
});

const handleMouseEnter = (event) => {
  const gif = event.currentTarget.querySelector(".hover-gif");
  gsap.to(gif, { opacity: 1, duration: 0.5 });
};

const handleMouseLeave = (event) => {
  const gif = event.currentTarget.querySelector(".hover-gif");
  gsap.to(gif, { opacity: 0, duration: 0.5 });
};

const modules = [Navigation, Scrollbar];
</script>

<style lang="scss" scoped>
@use "sass:math";

$aspect-ratio: math.div(4, 3);

.mySwiper {
  width: 100%;
  height: 100%;
  background-color: var(--c-white);
  padding: 0 1rem;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: var(--c-white);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay-open {
  text-decoration: none;
  color: var(--c-white);
  cursor:url('../assets/cursor.png'), auto;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 70vh;
  transition: transform 0.5s ease;
  margin-bottom: 50px;
  cursor: url('../assets/drag_01.png'), auto;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  color: var(--c-white);
}

.title {
  font-size: var(--t-bigText);
  font-family: var(--f-light);
  line-height: 60px;
  padding: 1rem;
}

.base-image, .hover-gif {
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

@media(max-width: 767px) {
  .swiper-slide {
  padding: 0;
}
}

</style>
