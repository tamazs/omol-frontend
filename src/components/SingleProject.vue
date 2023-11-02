<template>
  <div class="grid-container">
    <div class="grid-item video-item">
      <p class="before-text" v-if="pState.projects[0]">{{ pState.projects[0].title }}</p>
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
    </div>
  </div>
  <BTSslider/>
  <div class="button-row">
        <button @click="navigateBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 66 55" fill="none">
            <path d="M27.1492 54.365L30.5428 50.9713L9.17966 29.6081L65.4807 29.6081L65.4807 24.823L9.17966 24.823L30.5428 3.45985L27.1492 0.0661753L-0.000237088 27.2156L27.1492 54.365Z" fill="#1E1E1E"/>
          </svg> Back
        </button>
        <button @click="navigateToNextProject" v-if="pState.nextProjectId" class="next-button">
          Next <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 66 55" fill="none">
          <path d="M38.9351 0.0666488L35.5414 3.46032L56.9046 24.8235L0.603486 24.8235L0.603486 29.6086L56.9046 29.6086L35.5414 50.9718L38.9351 54.3655L66.0845 27.2161L38.9351 0.0666488Z" fill="#1E1E1E"/>
        </svg>
        </button>
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

.before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0;
    width: 17vw;
    margin-bottom: 2rem;
  }

  .before-text::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #F0444A;
  border-radius: 50%;
  position: absolute;
  left: 2.5rem;
  top: 6.1rem;
  z-index: 2;
  line-height: 0px;
}

.video-item {
  grid-area: video;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  font-size: var(--t-bigText);
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
  text-transform: uppercase;
  margin-top: 20px;
  text-align: right;
}

.project-tag {
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
  cursor:url('../assets/click.png'), auto;
  height: 5rem;
  width: 10rem;
  font-size: var(--t-header2);
  display: flex;
  justify-content: space-evenly;
  font-family: var(--f-thin);
}

@media (max-width: 767px) {
  .desc {
  gap: 0;
  flex-direction: column;
}

.project-description {
  column-count: 1;
  column-gap: 0;
  break-inside: avoid;
}

.grid-container {
  padding: 2rem 1rem;
  width: 100vw;
}

.text-item {
  padding: 10px;
}

.project-title {
  font-size: var(--t-bigText);
  margin-bottom: 15px;
  border: 3px var(--c-red) solid;
  border-radius: 50%;
  padding: 1rem 2rem;
  width: max-content;
}
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BTSslider from './BTSslider.vue';
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

