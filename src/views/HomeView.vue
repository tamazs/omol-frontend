<template>
    <div ref="homeContainer" class="home-container">
        <VideoHeroSection />
        <CookieBanner />
        <HistorySection />
        <TextHighlight />
        <ProjectSlider />
        <MarqueeSection />
        <ContactForm />
        <Popup v-if="showPopup && !manuallyClosed" @close-popup="closePopup" />
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import ProjectSlider from '../components/ProjectSlider.vue';
import HistorySection from '../components/HistorySection.vue';
import VideoHeroSection from '../components/VideoHeroSection.vue';
import TextHighlight from '../components/TextHighlight.vue';
import MarqueeSection from '../components/MarqueeSection.vue';
import ContactForm from '../components/ContactForm.vue';
import CookieBanner from '../components/CookieBanner.vue';
import Popup from '@/components/Popup.vue';

const showPopup = ref(false);
const manuallyClosed = ref(false); // Add a flag to track manual closure
const mouseActivityTime = ref(0);
let popupOpened = false;

const closePopup = () => {
    showPopup.value = false;
    manuallyClosed.value = true; // Set the flag to indicate manual closure
};

const resetMouseActivity = () => {
    mouseActivityTime.value = 0;
};

onMounted(() => {
    let timerPopup;

    const startTracking = () => {
        if (!popupOpened) {
            popupOpened = true;
            timerPopup = setTimeout(() => {
                showPopup.value = true;
            }, 60000); // 60 seconds
        }
    };

    const stopTracking = () => {
        clearTimeout(timerPopup);
    };

    document.addEventListener('mousemove', () => {
        if (!showPopup.value && !manuallyClosed.value) {
            if (mouseActivityTime.value === 0) {
                startTracking();
            }
        }

        resetMouseActivity();
    });

    onUnmounted(() => {
        document.removeEventListener('mousemove', resetMouseActivity);
        stopTracking();
    });
});
</script>
  
<style lang="scss" scoped>
.home-container {
    overflow: hidden;
}
</style>
  