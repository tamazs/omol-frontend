<template>
  <div class="screens" @click="nextScreen">
    <div class="text-container">
      <h1 v-if="currentIndex === 0">¡Gracias!</h1>
      <h1 v-if="currentIndex === texts.length - 1">Ahora, el desafío:</h1>
      <p class="infoText">{{ currentText }}</p>
      <div class="final-btn-container" v-if="currentIndex === texts.length - 1">
        <RouterLink class="select-btn" to="/cam">empezar!</RouterLink>
        <RouterLink class="select-btn" to="/home">no, gracias</RouterLink>
      </div>
      <p v-if="currentIndex === 0" class="bottom-text">Eso sí, un minuto de amor total.</p>
      <p v-else class="bottom-text">recuerda, si parpadeas te lo pierdes...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const texts = [
  "Hoy en día, no tenemos tiempo que perder y la atención se agota mucho más rápido, es mejor condensar nuestro mensaje en poco más de un minuto.",
  "por eso nos gustaria,  enseñarte lo que hacemos en un video reel de 1 minuto, pero primero necesitamos que permitas el acceso a tu cámara.",
  "no puedes pestañear mientras lo miras, ya que si lo haces, tu minuto se habrá acabado.",
];

const currentIndex = ref(0);

const currentText = computed(() => texts[currentIndex.value]);

const nextScreen = () => {
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++;
  }
};

onMounted(() => {
  currentIndex.value = 0;
});

watch(route, () => {
  currentIndex.value = 0;
});

</script>

<style lang="scss" scoped>
.screens {
background-color: var(--c-white);
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
}

.text-container {
width: 50vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.infoText {
color: var(--c-black);
font-size: var(--t-header3);
text-transform: uppercase;
margin-bottom: 2rem;
line-height: 3rem;
}

h1 {
  text-transform: uppercase;
  font-size: var(--t-header1);
  margin-bottom: 2rem;
}

.final-btn-container {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
}

.select-btn {
  text-decoration: none;
  color: var(--c-black);
  font-size: var(--t-header3);
  }

  .bottom-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  text-transform: uppercase;
  transform: translateX(-50%);
  color: var(--c-black);
  font-size: var(--t-body);
}
</style>
