<template>
  <NavBar/>
  <router-view />
  <!-- <div class="curtain-column" v-for="i in 4" :key="i" :style="`left: ${25 * (i - 1)}%`"></div> -->
</template>

<style scoped>
.curtain-column {
  position: fixed;
  top: 0;
  width: 25%;
  height: 100%;
  background-color: var(--c-red);
  z-index: 1000;
}
</style>

<script setup>
import NavBar from './components/NavBar.vue';
</script>