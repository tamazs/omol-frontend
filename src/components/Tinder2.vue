<template>
    <div class="tinder" @mousedown="onSwipeStart" @mousemove="onSwipeMove" @mouseup="onSwipeEnd">
      <div
        class="tinder--card"
        v-for="(crew, index) in crews"
        :key="crew.id"
        :style="{ zIndex: crews.length - index, transform: crew.transform, opacity: crew.opacity }"
        @remove="onRemove(index)"
      >
        <img :src="crew.img" />
      </div>
    </div>
    <div class="button-row">
      <button class="rewind-button" @click="rewindCard">
        <img src="../assets/rewindB.png" alt="Rewind" />
      </button>
      <button class="nope-button" @click="nopeCard">
        <img src="../assets/nopeB.png" alt="Nope" />
      </button>
      <button class="like-button" @click="likeCard">
        <img src="../assets/heartB.png" alt="Like" />
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import Hammer from 'hammerjs';
  import crew from '../modules/crew';
  import { useRouter } from 'vue-router';

const router = useRouter();
  
  const { crewState, getCrews } = crew();
  const crews = computed(() => crewState.crews);
  const prevCard = ref(null);
  
  const isDragging = ref(false);
  const startX = ref(0);
  const startCardX = ref(0);
  
  onMounted(() => {
    getCrews();
    initCards();
  });
  
  function initCards() {
    crews.value.forEach((crew, index) => {
      crew.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
      crew.opacity = 1;
    });
  
    if (crews.value.length > 0) {
      prevCard.value = crews.value[0];
    }
  }
  
  const onSwipeStart = (event) => {
    if (!isDragging.value) {
      isDragging.value = true;
      startX.value = event.clientX;
      startCardX.value = crews.value[0].transform.match(/-?\d+/);
    }
  };
  
  const onSwipeMove = (event) => {
    if (isDragging.value) {
      const deltaX = event.clientX - startX.value;
      const card = crews.value[0];
      card.transform = `translateX(${startCardX.value + deltaX}px) rotate(${deltaX > 0 ? '15' : '-15'}deg)`;
      card.opacity = Math.min(1, 1 - Math.abs(deltaX) / 1500);
    }
  };
  
  const onSwipeEnd = () => {
    if (isDragging.value) {
      const deltaX = startX.value - event.clientX;
      isDragging.value = false;
      const card = crews.value[0];
      if (Math.abs(deltaX) > 150) {
        if (deltaX > 0) {
          // Swiped to the left (Nope)
          nopeCard();
        } else {
          // Swiped to the right (Like)
          likeCard();
        }
      } else {
        card.transform = '';
        card.opacity = 1;
      }
    }
  };
  
  const removeCard = (love) => {
    if (crews.value.length > 0) {
      prevCard.value = crews.value.shift();
    }
  };
  
  const rewindCard = () => {
    if (prevCard.value) {
      prevCard.value.transform = '';
      crews.value.unshift(prevCard.value);
      prevCard.value = null;
    }
  };
  
  const openPage = () => {
    const crewId = crews.value[0].id;
    router.push({ name: 'member', params: { id: crewId } });
  };
  
  const likeCard = () => {
    if (crews.value.length > 0) {
      const card = crews.value[0];
      card.transform = 'translateX(100%) rotate(15deg)';
      setTimeout(() => {
        removeCard(true);
      }, 300);
    }
  };
  
  const nopeCard = () => {
  if (crews.value.length > 0) {
    const card = crews.value[0];
    card.transform = 'translateX(-100%) rotate(-15deg)';

    setTimeout(() => {
        openPage();
      removeCard(false);
    }, 300);
  }
};

  </script>
  
  <style scoped>
  .tinder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
    width: 100vw;
    margin-top: 5rem;
  }
  
  .tinder--card {
    display: inline-block;
    max-width: 400px;
    height: 70vh;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    will-change: transform, opacity;
    transition: all 0.3s ease-out;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .tinder--card img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }
  
  .button-row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    gap: 20px;
  }
  
  .button-row button {
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .button-row button img {
    height: 100%;
  }

  .nope-button {
    rotate: -45deg;
  }
  </style>
  