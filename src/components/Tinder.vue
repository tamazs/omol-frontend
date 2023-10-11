<template>
  <div class="tinder" v-bind:class="{ loaded: isLoaded }">
    <div class="tinder--status">
      <i class="fa fa-remove"></i>
      <i class="fa fa-heart"></i>
    </div>
    <div class="tinder--cards">
      <div
        class="tinder--card"
        v-for="(card, index) in cards"
        :key="index"
        v-bind:style="{ zIndex: cards.length - index, transform: card.transform, opacity: card.opacity }"
      >
        <img :src="card.image" />
        <h2>{{ card.name }}</h2>
        <p>{{ card.description }}</p>
      </div>
    </div>
    <div class="tinder--buttons">
      <button id="nope" @click="onNope"><i class="fas fa-plus"></i></button>
      <button id="love" @click="onLove"><i class="fas fa-heart"></i></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hammer from 'hammerjs';

const isLoaded = ref(false);
const cards = ref([
  {
    image: '../../src/assets/tinder1.png',
    name: 'Nacho',
    description: 'Soy de la Sierra y un día salí con el móvil a grabar...',
    transform: '',
    opacity: ''
  },
  {
    image: '../../src/assets/tinder2.png',
    name: 'Demo card 2',
    description: 'This is a demo for Tinder-like swipe cards',
    transform: '',
    opacity: ''
  },
  {
    image: '../../src/assets/tinder3.png',
    name: 'Demo card 3',
    description: 'This is a demo for Tinder-like swipe cards',
    transform: '',
    opacity: ''
  },
]);

onMounted(() => {
  setTimeout(() => {
    initCards();
    isLoaded.value = true;
  }, 100);
});

function initCards() {
  cards.value.forEach((card, index) => {
    card.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
    card.opacity = (10 - index) / 10;
  });
}

onMounted(() => {
  const cardElements = Array.from(document.querySelectorAll('.tinder--card'));
  cardElements.forEach((el, index) => {
    const hammertime = new Hammer(el);
    let isMoving = false;
    let initialX = 0;
    let deltaX = 0;
    hammertime.on('panstart', (event) => {
      isMoving = true;
      el.classList.add('moving');
      initialX = event.center.x;
    });
    hammertime.on('pan', (event) => {
      if (!isMoving) return;
      deltaX = event.center.x - initialX;
      const xMulti = deltaX * 0.03;
      const rotate = xMulti * 2;
      el.style.transform = `translate(${deltaX}px) rotate(${rotate}deg)`;
      el.classList.toggle('removed', Math.abs(deltaX) > 80);
    });
    hammertime.on('panend', () => {
      isMoving = false;
      el.classList.remove('moving');
      if (Math.abs(deltaX) > 380) {
        cards.value.splice(index, 1);
        initCards();
      } else {
        el.style.transform = '';
      }
      deltaX = 0;
    });
  });
});

function onNope() {
  removeCard(false);
}

function onLove() {
  removeCard(true);
}

function removeCard(love) {
  const card = cards.value[0];
  if (card) {
    card.transform = `translate(${love ? '150%' : '-150%'}, -100px) rotate(${love ? '-30' : '30'}deg)`;
    card.opacity = 0;
    setTimeout(() => {
      cards.value.shift();
      initCards();
    }, 300);
  }
}
</script>

<style scoped>
  *, *:before, *:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  overflow: hidden;
}

.tinder {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  background: var(--c-white);
}

.loaded.tinder {
  opacity: 1;
}

.tinder--status {
  position: absolute;
  top: 50%;
  margin-top: -30px;
  z-index: 2;
  width: 100%;
  text-align: center;
  pointer-events: none;
}

.tinder--status i {
  font-size: 100px;
  opacity: 0;
  transform: scale(0.3);
  transition: all 0.2s ease-in-out;
  position: absolute;
  width: 100px;
  margin-left: -50px;
}

.tinder_love .fa-plus {
  opacity: 0.7;
  transform: scale(1);
}

.tinder_nope .fa-remove {
  opacity: 0.7;
  transform: scale(1);
}

.tinder--cards {
  flex-grow: 1;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
}

.tinder--card {
  display: inline-block;
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  will-change: transform;
  transition: all 0.3s ease-out;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}

.moving.tinder--card {
  transition: none;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}

.tinder--card img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.tinder--buttons {
  flex: 0 0 100px;
  text-align: center;
  padding-top: 20px;
}

.tinder--buttons button {
  border-radius: 50%;
  line-height: 60px;
  width: 60px;
  border: 0;
  background: var(--c-black);
  display: inline-block;
  margin: 0 8px;
}

.tinder--buttons button:focus {
  outline: 0;
}

.tinder--buttons i {
  font-size: 32px;
  vertical-align: middle;
}

.fa-heart {
  color: var(--c-red);
}

.fa-plus {
  color: var(--c-white);
}
</style>