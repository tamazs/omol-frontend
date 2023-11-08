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
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 66 55" fill="none">
            <path
              d="M27.1492 54.365L30.5428 50.9713L9.17966 29.6081L65.4807 29.6081L65.4807 24.823L9.17966 24.823L30.5428 3.45985L27.1492 0.0661753L-0.000237088 27.2156L27.1492 54.365Z"
              fill="#1E1E1E" />
          </svg> Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import crew from '../modules/crew';
import { useRouter } from 'vue-router';

const router = useRouter();

const { crewState, getSingleCrew } = crew();
const crews = computed(() => crewState.crews);
const memberId = ref(null);

watch(crews, (newCrews) => {
  if (newCrews.length > 0) {
    memberId.value = newCrews[0].id;
  }
});

// When navigating back, pass the member's ID as a query parameter
const navigateBack = () => {
  router.push({ name: 'team', query: { memberId: memberId.value } });
};

onMounted(() => {
  getSingleCrew();
});
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
    margin-top: 15rem;
    margin-bottom: 5rem;
  }

  .tinder-img {
    max-height: 40vh;
    rotate: -5deg;
  }

  .content {
    width: 100vw !important;
    padding: 2rem !important;
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
  margin-bottom: 8rem;
}

.back-button {
  background: transparent;
  border: none;
  color: var(--c-black);
  cursor: url('../assets/cursor.png'), auto;
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
