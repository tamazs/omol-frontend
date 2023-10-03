<template>
  <div class="grid-container">
    <div class="grid-item video-item">
      <video v-if="pState.projects[0]" :src="pState.projects[0].video" controls></video>
    </div>
    <div class="grid-item text-item">
      <h1 class="project-title" v-if="pState.projects[0]">{{ pState.projects[0].title }}</h1>
      <p class="project-description" v-if="pState.projects[0]">{{ pState.projects[0].description }}</p>
      <p class="project-category" v-if="pState.projects[0]">{{ pState.projects[0].category }}</p>
      <p class="project-tag">©2023 OMOL PRODUCTION TEAM</p>
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

.project-description {
  margin-top: 10px;
  column-count: 2;
  column-gap: 2rem;
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
</style>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import project from '../modules/project';
const route = useRoute();

const { pState, getSingleProject } = project();

const projectId = computed(() => route.params.id);

onMounted(() => {
  if (projectId.value) {
    getSingleProject();
  }
});
</script>
