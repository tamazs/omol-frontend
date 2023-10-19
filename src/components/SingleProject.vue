<template>
  <div class="grid-container">
    <div class="grid-item video-item">
      <video v-if="pState.projects[0]" :src="pState.projects[0].video" controls></video>
    </div>
    <div class="grid-item text-item">
      <h1 class="project-title" v-if="pState.projects[0]">{{ pState.projects[0].title }}</h1>
      <div class="desc">
        <p class="info">Information:</p>
        <p class="project-description" v-if="pState.projects[0]">{{ pState.projects[0].description }}</p>
      </div>
      <p class="project-category" v-if="pState.projects[0]">{{ pState.projects[0].category }}</p>
      <p class="project-tag">©2023 OMOL PRODUCTION TEAM</p>
      <div class="button-row">
        <button @click="navigateBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> Back
        </button>
        <button @click="navigateToNextProject" v-if="pState.nextProjectId" class="next-button">
          Next <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "video"
    "text";
  height: auto;
  width: 100vw;
  overflow: hidden;
  padding: 6rem 4rem;
  background: var(--c-white);
}

.grid-item {
  width: 100%;
}

.video-item {
  grid-area: video;
  display: flex;
  justify-content: center;
}

.video-item video {
  max-width: 100%;
  max-height: 85vh;
  object-fit: cover;
}

.text-item {
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.project-title {
  font-size: var(--t-header2);
  margin-bottom: 15px;
  border: 3px var(--c-red) solid;
  border-radius: 50%;
  padding: 1rem 4rem;
  width: max-content;
}

.desc {
  display: flex;
  align-items: flex-start;
  gap: 8rem;
}

.info {
  margin-top: 10px;
  text-transform: uppercase;
}

.project-description {
  margin-top: 10px;
  column-count: 2;
  column-gap: 8rem;
  break-inside: avoid;
  line-height: 1.3rem;
}

.project-category {
  font-size: var(--t-header3);
  text-transform: uppercase;
  margin-top: 20px;
  text-align: right;
}

.project-tag {
  font-size: var(--t-header3);
  text-transform: uppercase;
  text-align: right;
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
}

.back-button,
.next-button {
  background: transparent;
  border: none;
  color: var(--c-black);
  cursor: pointer;
  height: 5rem;
  width: 10rem;
  font-size: var(--t-header2);
  display: flex;
  justify-content: space-evenly;
  font-family: var(--f-thin);
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import project from '../modules/project';
const route = useRoute();
const router = useRouter();
const { pState, getSingleProject } = project();

const projectId = ref(null);

watch(() => route.params.id, (newProjectId) => {
  projectId.value = newProjectId;
  if (projectId.value) {
    getSingleProject();
  }
});

const navigateToNextProject = () => {
  if (pState.nextProjectId) {
    router.push({ name: 'project', params: { id: pState.nextProjectId } });
  }
};

const navigateBack = () => {
  router.go(-1);
};

onMounted(() => {
  projectId.value = route.params.id;
  if (projectId.value) {
    getSingleProject();
  }
});
</script>

