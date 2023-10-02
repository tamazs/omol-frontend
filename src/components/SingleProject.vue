<template>
  <div class="grid-container">
    <div class="grid-item video-item">
      <video v-if="pState.projects[0]" :src="pState.projects[0].video" controls></video>
    </div>
    <div class="grid-item text-item">
      <h1 class="project-title" v-if="pState.projects[0]">{{ pState.projects[0].title }}</h1>
      <p>Text content below the video.</p>
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
}

.grid-item {
  width: 100%;
}

.video-item {
  grid-area: video;
}

.video-item video {
  width: 100%;
  height: auto;
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
