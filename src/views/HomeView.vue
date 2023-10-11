<template>
    <div ref="homeContainer" class="home-container">
        <VideoHeroSection/>
        <HistorySection/>
        <TextHighlight/>
        <ProjectSlider/>
        <MarqueeSection/>
        <ContactSection/>
        <ContactForm/>
    </div>
</template>

<script setup>
import ProjectSlider from '../components/ProjectSlider.vue';
import HistorySection from '../components/HistorySection.vue';
import VideoHeroSection from '../components/VideoHeroSection.vue';
import TextHighlight from '../components/TextHighlight.vue';
import MarqueeSection from '../components/MarqueeSection.vue';
import ContactSection from '../components/ContactSection.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<style lang="scss" scoped>
.home-container {
    overflow: hidden;
}
</style>