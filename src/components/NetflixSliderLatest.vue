<template>
  <div class="netflixSliderLatestBody">
    <h1 class="sliderTitle">{{ $t('projects.latestWork') }}</h1>
    <swiper :slidesPerView="slidesPerView" :spaceBetween="15" :navigation="false" :scrollbar="false" :modules="modules"
      class="netflixSwiper">
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="netflix-swiper-slide">
        <div class="netflix-card">
          <div class="netflix-title">
            <p>{{ slide.title }}</p>
          </div>
          <div class="netflix-image-container" @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave(index)">
            <img class="netflix-base-image" :src="slide.img" alt="Project picture"/>
            <img class="netflix-hover-gif" :src="slide.gif" :class="{ playing: playStatus[index] }" alt="Project GIF"/>
          </div>
          <div class="netflix-button-container" :class="{ active: cardHovered[index] }">
            <div class="button-wrapper">
              <button class="netflix-play-button" @click="togglePlay(index)" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound"><img :src="playIcon(index)"
                  id="playmark" alt="Play/pause button"></button>
              <router-link :to="`/project/${slide.id}`" class="netflix-plus-button" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound"><img src="@/assets/plus.png"
                  id="plusmark" alt="Open project button"></router-link>
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

.netflixSliderLatestBody:hover .sliderTitle {
  border: 2px var(--c-red) solid;
}

.sliderTitle {
  padding: 0.7rem 1.8rem;
  font-size: var(--t-bigText);
  border: 2px transparent solid;
  border-radius: 50%;
  width: max-content;
  margin-left: 1rem;
  margin-bottom: 3rem;
}

.netflixSwiper {
  width: 100%;
  height: 100%;
  background-color: var(--c-white);
  padding: 0 3rem;
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
  margin-bottom: 40px;
}

.netflix-card {
  width: 100%;
  height: math.div(100, $aspect-ratio) slash;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 130px;
}

.netflix-title {
  font-size: 0.7rem;
  margin-bottom: 10px;
  margin-left: 25px;
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
  top: 0;
  z-index: 2;
}

.netflix-image-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: url('../assets/drag_01.png'), auto;
}

.netflix-base-image,
.netflix-hover-gif {
  width: 100%;
  height: 55vh;
  object-fit: cover;
  transition: all 1s;
  opacity: 0.4;
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
  bottom: -9rem;
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  z-index: 2;
}

.netflix-card:hover .netflix-button-container {
  display: flex;
  background: transparent;
}

.netflix-card:hover .netflix-base-image {
  opacity: 1;
}

.netflix-card:hover .netflix-title::before {
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

/* .netflix-card:hover .netflix-base-image,
.netflix-hover-gif {
  height: 53vh;
} */

.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.netflix-play-button,
.netflix-plus-button {
  background: transparent;
  border: none;
  cursor: url('../assets/cursor.png'), auto;
  color: var(--c-red);
  margin-right: 10px;
  margin-left: -5px;
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

#plusmark,
#playmark {
  height: 2.5rem;
}

@media (max-width: 767px) {
  .sliderTitle {
  padding: 0.7rem 1rem !important;
  margin-left: 0rem !important;
  width: 100vw !important;
  text-align: center !important;
}

.netflix-play-button,
.netflix-plus-button {
  margin-right: 2px !important;
  margin-left: -8px !important;
}

.netflix-swiper-slide {
  overflow: visible !important;
}
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
import pauseImage from '@/assets/pause.png';
import playImage from '@/assets/play.png';
import tickSound from '@/assets/tick4.mp3';
import tickSoundMouseDown from '@/assets/tick1.mp3';

const { pState, latestProjects } = project();

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
    gsap.to(gif, { opacity: 1, duration: 0.1 });
  } else {
    gsap.to(gif, { opacity: 0, duration: 0.1 });
  }
};

const playIcon = (index) => {
  return playStatus.value[index] ? pauseImage : playImage;
};

const modules = [Navigation, Scrollbar];

const audio = new Audio(tickSound);
const audioMouseDown = new Audio(tickSoundMouseDown);

const playSound = () => {
  audio.play();
};

const stopSound = () => {
  audio.pause();
  audio.currentTime = 0;
};

const playMouseDownSound = () => {
  audioMouseDown.play();
};

const stopMouseDownSound = () => {
  audioMouseDown.pause();
  audioMouseDown.currentTime = 0;
};
</script>
