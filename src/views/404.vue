<template>
    <div class="container">
      <p>404-335= <span class="typed-text">{{ typedText }}</span><span class="cursor"></span></p>
      <div class="bottom-text">{{ $t('404.bottomText') }}</div>
    </div>
  </template>
  
  <style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container p {
  font-size: var(--t-header1);
  padding: 0.5rem;
  letter-spacing: 0.1rem;
  text-align: center;
  overflow: hidden;
  font-family: var(--f-light);
  display: flex;
  align-items: flex-start;
}
.bottom-text {
  position: absolute;
  bottom: 15%;
  font-size: 14px;
  z-index: 2;
  text-transform: uppercase;
  font-family: var(--f-light);
}
.container p span.typed-text {
  font-weight: bold;
  color: var(--c-red);
}
.container p span.cursor {
  display: inline-block;
  background-color: var(--c-red);
  margin-left: 0.4rem;
  width: 2px;
  height: 4.063rem;
  animation: blink 1s infinite;
}
.container p span.cursor.typing {
  animation: none;
}
@keyframes blink {
  0%  { background-color: var(--c-red); }
  49% { background-color: var(--c-red); }
  50% { background-color: transparent; }
  99% { background-color: transparent; }
  100%  { background-color: var(--c-red); }
}
  </style>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const typedText = ref('');
  let textArray = ["69", "LOVE"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedText.value += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typedText.value = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  onMounted(() => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
  });
  </script>
  