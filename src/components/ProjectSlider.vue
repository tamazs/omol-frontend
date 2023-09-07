<template>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="image-wrapper" @mouseenter="handleMouseEnter($event)" @mouseleave="handleMouseLeave($event)">
          <img class="base-image" :src="slide.img" />
          <img class="hover-gif" :src="slide.gif" />
        </div>
      </swiper-slide>
    </swiper>
</template>

<script setup>
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const slides = [
  { img: "https://swiperjs.com/demos/images/nature-1.jpg", gif: "https://media1.giphy.com/media/l0ErWnkLjegNB5LlC/giphy.gif?cid=ecf05e47czxrjfulzddfq14u79h6kuim7hq4831fooozl58d&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { img: "https://swiperjs.com/demos/images/nature-1.jpg", gif: "https://media1.giphy.com/media/l0ErWnkLjegNB5LlC/giphy.gif?cid=ecf05e47czxrjfulzddfq14u79h6kuim7hq4831fooozl58d&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { img: "https://swiperjs.com/demos/images/nature-1.jpg", gif: "https://media1.giphy.com/media/l0ErWnkLjegNB5LlC/giphy.gif?cid=ecf05e47czxrjfulzddfq14u79h6kuim7hq4831fooozl58d&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { img: "https://swiperjs.com/demos/images/nature-1.jpg", gif: "https://media1.giphy.com/media/l0ErWnkLjegNB5LlC/giphy.gif?cid=ecf05e47czxrjfulzddfq14u79h6kuim7hq4831fooozl58d&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
  { img: "https://swiperjs.com/demos/images/nature-1.jpg", gif: "https://media1.giphy.com/media/l0ErWnkLjegNB5LlC/giphy.gif?cid=ecf05e47czxrjfulzddfq14u79h6kuim7hq4831fooozl58d&ep=v1_gifs_search&rid=giphy.gif&ct=g" },
];

const handleMouseEnter = (event) => {
  const gif = event.currentTarget.querySelector(".hover-gif");
  gsap.to(gif, { opacity: 1, duration: 0.5 });
  gsap.to(event.currentTarget, { scale: 1.2, duration: 0.5 });
};

const handleMouseLeave = (event) => {
  const gif = event.currentTarget.querySelector(".hover-gif");
  gsap.to(gif, { opacity: 0, duration: 0.5 });
  gsap.to(event.currentTarget, { scale: 1, duration: 0.5 });
};

const modules = [Navigation];
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
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
</style>
