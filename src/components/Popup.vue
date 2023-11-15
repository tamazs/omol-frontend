<template>
  <div class="popup">
    <div class="popup-content">
      <div class="close-button-container">
        <button @click="onClosePopup" class="close-button"><i class="fa-solid fa-x"></i></button>
      </div>
      <h1>{{ $t('home.popupTitle') }}</h1>
      <p>{{ $t('home.popupText1') }}
        <br />
        <br />
        {{ $t('home.popupText2') }}
      </p>
      <form class="input-container" @submit.prevent="validateAndSend" id="formPopup">
        <div v-if="!emailFilled && formSubmitted" class="error-message">Please fill your email</div>
        <input type="email" v-model="email" placeholder="Type your email here" name="from_email" required />
        <input class="sendBtn" type="submit" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound" :value="$t('home.popupButton')" />
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue';
import emailjs from 'emailjs-com';
import tickSound from '@/assets/tick4.mp3';
import tickSoundMouseDown from '@/assets/tick1.mp3';

const emit = defineEmits(['close-popup']);
const email = ref('');
const emailFilled = ref(false);
const formSubmitted = ref(false);

const onClosePopup = () => {
  emit('close-popup');
};

function validateAndSend() {
  formSubmitted.value = true;

  // Check if the email is not empty
  if (!email.value) {
    emailFilled.value = false;
    return;
  }

  // Validate email using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (!emailRegex.test(email.value)) {
    emailFilled.value = false;
    return;
  }

  emailFilled.value = true;

  try {
    const formPopup = document.getElementById('formPopup');
    emailjs
      .sendForm('service_sf36spt', 'template_a3s91kb', formPopup, 'Nt2p85bhPW38Tj0vc')
      .then(() => {
        const samplePdfUrl = '/sample.pdf';
        const downloadLink = document.createElement('a');
        downloadLink.href = samplePdfUrl;
        downloadLink.download = 'sample.pdf';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        emit('close-popup');
      })
      .catch((error) => {
        console.error('Email sending error:', error);
        // Handle the error, you can show an error message or set an error flag
      });
  } catch (error) {
    console.log({ error });
  }
}

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
  
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 2rem;
  transition: all 1s;
}

.popup-content {
  background-color: var(--c-white);
  width: 70%;
  height: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.close-button-container {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--c-black);
  cursor: url('../assets/cursor.png'), auto;
}

h1 {
  font-size: var(--t-bigText);
  margin: 0;
  width: 60%;
}

p {
  font-size: 16px;
  margin: 0;
  margin-top: 20px;
  width: 60%;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

input {
  border: none;
  border-bottom: 1px solid #707070;
  padding: 10px;
  margin-right: 10px;
  width: 60%;
  background-color: transparent;
  font-size: 1.2rem;
  font-family: var(--f-regular);
}

input:focus {
  outline: none;
}

input::placeholder {
  font-family: var(--f-regular);
  text-transform: uppercase;
  font-size: 1.2rem;
}

.sendBtn {
  font-family: var(--f-light);
  text-decoration: none;
  color: var(--c-black);
  font-size: var(--t-header3);
  cursor: url('../assets/cursor.png'), auto;
  border: 2px transparent solid;
  border-radius: 50%;
  padding: 1.2rem 1.8rem;
  background-color: transparent;
  width: max-content;
}

.sendBtn:hover {
  border: 2px var(--c-red) solid;
}

@media (max-width: 767px) {

  .popup {
  padding: 0rem;
}
  .popup-content {
  width: 100%;
  height: max-content;
  padding: 2rem 1rem;
  justify-content: center;
}

.close-button {
  top: 25vh;
  right: 8vw;
}

p {
  width: 85%;
}
}
</style>
  