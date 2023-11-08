<template>
    <div ref="contactSection" class="contact-section" @mousemove="handleMouseMove">
        <div ref="myDiv" class="my-div" @click="sendEmail">
            Click to get some love
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

</script>

<style lang="scss" scoped>
.contact-section {
    height: 50vh;
    width: 100vw;
    background-color: var(--c-white);
    position: relative;
    z-index: 999;
    cursor: none;
}

.my-div {
    width: 8rem;
    height: 8rem;
    background-color: var(--c-red);
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(16, 0, 54, 0.2);
    color: var(--c-white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
