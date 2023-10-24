<template>
  <div v-if="crews[0]" class="container">
    <div class="left">
      <img class="tinder-img" :src="crews[0].img" alt="Crew Image" />
    </div>
    <div class="right">
      <div class="content">
        <h1 class="name">{{ crews[0].firstName }} {{ crews[0].lastName }}</h1>
        <p class="bio">{{ crews[0].bio }}</p>
        <button @click="navigateBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import crew from '../modules/crew';
import { useRouter } from 'vue-router';

const router = useRouter();

const { crewState, getSingleCrew } = crew();
const crews = computed(() => crewState.crews);

onMounted(() => {
  getSingleCrew();
});

const navigateBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    width: 100vw;
  }

  .tinder-img {
  max-height: 40vh;
  rotate: -5deg;
}

.content {
  width: 100vw !important;
  padding: 20px;
}
}

.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tinder-img {
  height: 65vh;
  rotate: -5deg;
}

.right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 40vw;
  padding: 0;
}

.name {
  color: var(--c-red);
  font-size: var(--t-header1);
  margin-bottom: 2rem;
}

.bio {
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.back-button {
  background: transparent;
  border: none;
  color: var(--c-black);
  cursor: pointer;
  height: 5rem;
  width: 10rem;
  font-size: var(--t-header2);
  display: flex;
  justify-content: flex-start;
  font-family: var(--f-thin);
  padding: 0;
  gap: 20px;
}
</style>
