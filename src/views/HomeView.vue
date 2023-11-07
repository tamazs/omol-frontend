<template>
    <div ref="homeContainer" class="home-container">
        <VideoHeroSection/>
        <CookieBanner/>
        <HistorySection/>
        <TextHighlight/>
        <ProjectSlider/>
        <MarqueeSection/>
        <ContactForm/>
    </div>
</template>

<script setup>
import ProjectSlider from '../components/ProjectSlider.vue';
import HistorySection from '../components/HistorySection.vue';
import VideoHeroSection from '../components/VideoHeroSection.vue';
import TextHighlight from '../components/TextHighlight.vue';
import MarqueeSection from '../components/MarqueeSection.vue';
import ContactForm from '../components/ContactForm.vue';
import CookieBanner from '../components/CookieBanner.vue';
</script>

<style lang="scss" scoped>
.home-container {
    overflow: hidden;
}
</style>