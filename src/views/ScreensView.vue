<template>
  <div class="screens" @click="nextScreen">
    <div class="text-container">
      <h1 v-if="currentIndex === 0">{{ $t('intro.thanku') }}</h1>
      <h1 v-if="currentIndex === texts.length - 1">{{ $t('intro.challengeTitle') }}</h1>
      <p class="infoText">{{ currentText }}</p>
      <div class="final-btn-container" v-if="currentIndex === texts.length - 1">
        <RouterLink class="select-btn" to="/cam">{{ $t('intro.button3') }}</RouterLink>
        <RouterLink class="select-btn" to="/home">{{ $t('intro.button4') }}</RouterLink>
      </div>
      <p v-if="currentIndex === 0" class="bottom-text">{{ $t('intro.bottomText1') }}</p>
      <p v-else class="bottom-text">{{ $t('intro.bottomText2') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const texts = [
  'intro.text2',
  'intro.text3',
  'intro.challengeText',
];

const currentIndex = ref(0);

const currentText = computed(() => $t(texts[currentIndex.value]));

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
width: 60vw;
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
line-height: 2rem;
font-family: var(--f-thin);
}

h1 {
  text-transform: uppercase;
  font-size: var(--t-header1);
  margin-bottom: 2rem;
  font-family: var(--f-thin);
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
  font-family: var(--f-light);
  }

  .bottom-text {
  position: absolute;
  bottom: 80px;
  left: 50%;
  text-transform: uppercase;
  transform: translateX(-50%);
  color: var(--c-black);
  font-size: var(--t-body);
  font-family: var(--f-light);
}
</style>
