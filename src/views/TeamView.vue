<template>
    <div>
        <Tinder :memberId="query.memberId"/>
    </div>
</template>

<script setup>
import Tinder from '../components/Tinder2.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = ref(router.currentRoute.value.query);
</script>

<style lang="scss" scoped>

</style>