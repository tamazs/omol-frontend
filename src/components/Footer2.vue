<template>
    <footer>
        © Goodsight 2023 · Todos los derechos reservados
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  footer {
    margin-bottom: 3rem !important;
  }
}
footer {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: var(--f-thin);
    color: var(--c-black);
    text-transform: uppercase;
    padding: 3rem 0rem;
}
</style>