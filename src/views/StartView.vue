<template>
    <div class="start">
    <div class="intro">
        <h1>¿Tienes un minuto?</h1>
        <p>si parpadeas te lo pierdes</p>
    </div>
     <div class="start-select">
        <RouterLink class="select-btn" to="/screens">Claro!</RouterLink>
        <RouterLink class="select-btn" to="/home">no, gracias</RouterLink>
     </div>
    </div>
</template>
  
  <script setup>

  </script>
  
<style lang="scss" scoped>
.start {
    background-color: var(--c-white);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;

    .intro {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    h1 {
        text-transform: uppercase;
        font-size: var(--t-header1);
    }

    p {
        text-transform: uppercase;
    }

    .start-select {
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
}

</style>