<template>
    <div class="screens" @click="nextScreen">
      <p class="infoText">{{ currentText }}</p>
    </div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router'
  const router = useRouter();
  
  const texts = [
    "Text on Screen 1. Click to continue.",
    "Text on Screen 2. Click to continue.",
    "Text on Screen 3. This is the last screen.",
  ];
  
  const currentIndex = ref(0);
  
  const currentText = computed(() => texts[currentIndex.value]);
  
  const nextScreen = () => {
    currentIndex.value++;
    if (currentIndex.value >= texts.length) {
      router.push('/cam');
    }
  };
  </script>
  
<style lang="scss" scoped>
.screens {
    background-color: var(--c-black);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .infoText {
        color: var(--c-white);
        font-size: 3rem;
    }
}

</style>