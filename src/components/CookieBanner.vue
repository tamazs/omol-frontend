<template>
  <div v-if="!cookieAccepted" class="cookie-consent">
    <div class="content">
      <p>{{ $t('home.cookieText') }}</p>
    </div>
    <div class="buttons">
      <button @click="acceptCookie" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">{{ $t('home.cookieAccept') }}</button>
      <button @click="declineCookie" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">{{ $t('home.cookieDecline') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import tickSound from '@/assets/tick4.mp3';
import tickSoundMouseDown from '@/assets/tick1.mp3';

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

const myCookieValue = ref(Cookies.get('myCookie'));
const cookieAccepted = ref(myCookieValue.value === 'OMOLACCEPTED');

const acceptCookie = () => {
  Cookies.set('myCookie', 'OMOLACCEPTED', { expires: 1 }); // Cookie expires in 1 day
  cookieAccepted.value = true;
};

const declineCookie = () => {
  Cookies.remove('myCookie'); // Remove the cookie
  cookieAccepted.value = true;
};
</script>
  
<style scoped>
@media (max-width: 767px) {
  .cookie-consent {
    height: auto !important;
    padding: 2rem !important;
    justify-content: flex-start !important;
    flex-direction: column;
  }

  .cookie-consent p {
    width: 100vw !important;
    padding: 2rem 2rem !important;
  }

  .cookie-consent .buttons {
  gap: 40px !important;
}}

.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 15vh;
  background-color: #2B2B2B;
  color: var(--c-white);
  padding: 1rem;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cookie-consent p {
  width: 55vw;
}

.cookie-consent .buttons {
  display: flex;
  align-items: center;
}

.cookie-consent button {
  background-color: transparent;
  color: var(--c-white);
  font-size: var(--t-header2);
  cursor: url('../assets/cursor.png'), auto;
  border: 2px transparent solid;
  border-radius: 50%;
  padding: 1.2rem 1.8rem;
  font-family: var(--f-light);
}

.cookie-consent button:hover {
  border: 2px var(--c-red) solid;
}
</style>
  