<template>
    <div class="start">
    <div class="intro">
        <h1>¿Tienes un minuto?</h1>
        <p>No necesitamos más que eso para contarte<br/> una historia de amor que cambiará tu vida.</p>
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
    gap: 7rem;

    .intro {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: var(--f-thin);
        text-transform: uppercase;
        font-size: 50px;
        margin-bottom: 20px;
    }

    p {
        font-family: var(--f-light);
        text-transform: uppercase;
        font-size: 20px;
    }

    .start-select {
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        gap: 5rem;
    }

    .select-btn {
        font-family: var(--f-light);
        text-decoration: none;
        color: var(--c-black);
        font-size: var(--t-header3);
    }
}

</style>