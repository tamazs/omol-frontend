<template>
    <div ref="contactSection" class="contact-section" @mousemove="handleMouseMove">
        <div ref="myDiv" class="my-div" @click="sendEmail"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const myDiv = ref(null);
const contactSection = ref(null);

const handleMouseMove = (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    const rect = contactSection.value.getBoundingClientRect();

    const divHalfWidth = myDiv.value.offsetWidth / 2;
    const divHalfHeight = myDiv.value.offsetHeight / 2;
    
    const isInside = 
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

    if (isInside) {
        gsap.to(myDiv.value, {
            x: clientX - rect.left - divHalfWidth,
            y: clientY - rect.top - divHalfHeight,
            duration: 0.5
        });
    }
};

const sendEmail = () => {
    window.location.href = "mailto:example@email.com?subject=Hello&body=Hi there!";
};

onMounted(() => {
  contactSection.value.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  contactSection.value.removeEventListener("mousemove", handleMouseMove);
});


</script>

<style lang="scss" scoped>
.contact-section {
    height: 50vh;
    width: 100vw;
    background-color: var(--c-white);
    position: relative;
    z-index: 9999;
}
.my-div {
  width: 6em;
  height: 6em;
  background-color: var(--c-red);
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(16, 0, 54, 0.2);
}
</style>
