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
          <p class="title">{{ slide.title }}</p>
          <router-link class="see-more" :to="`/project/${slide.id}`">{{ $t('home.sliderBtn') }}</router-link>
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

const { pState, getProjects} = project()

const slides = computed(() => pState.projects);

const slidesPerView = ref(window.innerWidth <= 767 ? 1 : 3);

const updateSlidesPerView = () => {
  slidesPerView.value = window.innerWidth <= 767 ? 1 : 3;
};

onMounted(() => {
  getProjects();

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
  cursor: grab;
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

.image-wrapper {
  position: relative;
  width: 100%;
  height: 300px; /* Use the same aspect ratio */
  transition: transform 0.5s ease;
  margin-bottom: 85px;
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
  font-size: var(--t-header2);
  margin-bottom: 70px;
  font-family: var(--f-light);
}

.see-more {
  color: var(--c-white);
  font-size: var(--t-body);
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
