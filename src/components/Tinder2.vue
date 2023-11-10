<template>
  <div class="tinder" @mousedown="onSwipeStart" @mousemove="onSwipeMove" @mouseup="onSwipeEnd" @touchstart="onSwipeStart"
    @touchmove="onSwipeMove" @touchend="onSwipeEnd">
    <div class="tinder--card" v-for="(crew, index) in crews" :key="crew.id"
      :style="{ zIndex: crews.length - index, transform: crew.transform, opacity: crew.opacity }"
      @remove="onRemove(index)">
      <img :src="crew.img" alt="Images of the crew"/>
    </div>
  </div>
  <div class="button-row">
    <button class="nope-button" @click="nopeCard" @mouseover="hoveredNope = true" @mouseout="hoveredNope = false">
      <img :src="hoveredNope ? xRed : nopeB" alt="Nope button" />
    </button>
    <button class="rewind-button" @click="rewindCard" @mouseover="hoveredRewind = true" @mouseout="hoveredRewind = false">
      <img :src="hoveredRewind ? rewindRed : rewindB" alt="Rewind button" />
    </button>
    <button class="like-button" @click="likeCard" @mouseover="hoveredLike = true" @mouseout="hoveredLike = false">
      <img :src="hoveredLike ? heartRed : heartB" alt="Like button" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, defineProps } from 'vue';
import Hammer from 'hammerjs';
import crew from '../modules/crew';
import { useRouter } from 'vue-router';
import xRed from '@/assets/x_red.png';
import nopeB from '@/assets/plusB.png';
import rewindB from '@/assets/rewindB.png';
import heartB from '@/assets/heartB.png';
import rewindRed from '@/assets/back_red.png';
import heartRed from '@/assets/love_red.png';

const hoveredNope = ref(false);
const hoveredRewind = ref(false);
const hoveredLike = ref(false);

const router = useRouter();

const { crewState, getCrews } = crew();
const crews = computed(() => crewState.crews);
const prevCard = ref(null);

const isDragging = ref(false);
const startX = ref(0);
const startCardX = ref(0);

const { memberId } = defineProps(['memberId']);

const memberIndex = computed(() => {
  if (memberId) {
    const parsedMemberId = parseInt(memberId);
    const index = crews.value.findIndex(crew => crew.id === parsedMemberId);
    return index >= 0 ? index : -1;
  }
  return -1;
});

watchEffect(() => {
  if (memberIndex.value >= 0) {
    removePreviousCards(memberIndex.value);
  }
});

onMounted(() => {
  getCrews();
  initCards();

  const tinderContainer = document.querySelector('.tinder');
  const hammer = new Hammer(tinderContainer);

  hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  hammer.on('panstart', onSwipeStart);
  hammer.on('panmove', onSwipeMove);
  hammer.on('panend', onSwipeEnd);
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
  };
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
      // Restore the card's position and opacity
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
    prevCard.value.opacity = '1';
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
    card.opacity = '0';
    setTimeout(() => {
      removeCard(true);
    }, 300);
  }
};

const nopeCard = () => {
  if (crews.value.length > 0) {
    const card = crews.value[0];
    card.transform = 'translateX(-100%) rotate(-15deg)';
    card.opacity = '0';
    setTimeout(() => {
      openPage();
      removeCard(false);
    }, 300);
  }
};

const removePreviousCards = (index) => {
  if (index > 0) {
    crews.value.splice(0, index);
  }
};
</script>
  
<style scoped>
.tinder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 100vw;
  margin-top: 5rem;
}

.tinder--card {
  display: inline-block;
  height: 60vh;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  will-change: transform, opacity;
  transition: all 0.3s ease-out;
  cursor: url('../assets/drag_01.png'), auto;
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
  height: 4rem;
  margin-top: 2rem;
  gap: 5px;
}

.button-row button {
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: url('../assets/cursor.png'), auto;
}

.button-row button img {
  height: 100%;
}
</style>
  