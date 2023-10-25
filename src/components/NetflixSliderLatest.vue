<template>
  <div>
    <h1 class="sliderTitle">Latest works</h1>
  <swiper
    :slidesPerView="slidesPerView"
    :spaceBetween="15"
    :navigation="false"
    :scrollbar="true"
    :modules="modules"
    class="netflixSwiper"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index" class="netflix-swiper-slide">
      <div class="netflix-card">
        <div class="netflix-title">
          <p>{{ slide.title }}</p>
        </div>
        <div class="netflix-image-container" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
          <img class="netflix-base-image" :src="slide.img" />
          <img class="netflix-hover-gif" :src="slide.gif" :class="{ playing: playStatus[index] }" />
        </div>
        <div class="netflix-button-container" :class="{ active: cardHovered[index] }">
          <div class="button-wrapper">
            <button class="netflix-play-button" @click="togglePlay(index)"><i :class="playIcon(index)"></i></button>
            <router-link :to="`/project/${slide.id}`" class="netflix-plus-button"><i class="fas fa-circle-xmark" id="plusmark"></i></router-link>
            <button class="netflix-close-button"><i class="fas fa-circle-xmark"></i></button>
          </div>
          <div class="netflix-hover-text">{{ slide.hoverText }}</div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</div>
</template>

<style scoped lang="scss">
@use "sass:math";

$aspect-ratio: math.div(4, 3);

.sliderTitle {
  padding: 2rem 1rem;
  font-size: var(--t-header2);
}
.netflixSwiper {
  width: 100%;
  height: 100%;
  background-color: var(--c-white);
  padding: 0 1rem;
}

.netflix-swiper-slide {
  font-size: 18px;
  background: var(--c-white);
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  grid-template-rows: 1fr;
  width: auto;
}

.netflix-card {
  width: 100%;
  height: math.div(100, $aspect-ratio) slash;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  margin-bottom: 85px;
}

.netflix-title {
  font-size: var(--t-body);
  margin-bottom: 10px;
  margin-left: 25px;
  font-family: 'HelveticaNeue', serif;
  text-transform: uppercase;
}

.netflix-title::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #F0444A;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 1px;
  z-index: 2;
}
.netflix-image-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.netflix-base-image,
.netflix-hover-gif {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.netflix-hover-gif {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}

.netflix-button-container {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: -80px;
  width: 100%;
  padding: 15px 0;
  box-sizing: border-box;
  z-index: 2;
}

.netflix-card:hover .netflix-button-container {
  display: flex;
  background: transparent;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.netflix-play-button,
.netflix-plus-button,
.netflix-close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: red;
  margin-right: 10px;
}

.netflix-play-button:hover,
.netflix-plus-button:hover,
.netflix-close-button:hover {
  color: #e50914;
}

.netflix-hover-gif.playing {
  opacity: 1;
}

.netflix-hover-text {
  display: none;
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}

.netflix-card:hover .netflix-hover-text {
  display: block;
}

#plusmark{
  rotate: -45deg;
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

const { pState, latestProjects } = project();

const slides = computed(() => pState.projects);

const slidesPerView = ref(window.innerWidth <= 767 ? 1 : 3);

const updateSlidesPerView = () => {
  slidesPerView.value = window.innerWidth <= 767 ? 1 : 3;
};

onMounted(() => {
  latestProjects();

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
  const gif = document.querySelectorAll(".netflix-hover-gif")[index];
  if (playStatus.value[index]) {
    gsap.to(gif, { opacity: 1, duration: 0.5 });
  } else {
    gsap.to(gif, { opacity: 0, duration: 0.5 });
  }
};

const playIcon = (index) => {
  return playStatus.value[index] ? "fas fa-circle-pause" : "fas fa-circle-play";
};

const modules = [Navigation, Scrollbar];
</script>
