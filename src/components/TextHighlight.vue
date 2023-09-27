<template>
    <div class="text-container" ref="textContainer">
      <p ref="text"><span class="highlight">Compartir al momento, hablar con tu audiencia, contarles 
        lo que haces en tiempo real es algo que está aquí.</span>
        <br>
        <br>
        <span class="highlight">
        Por eso nuestro servicio de grabación y edición 
        con smartphones de última generación es rápido, 
        entregado casi al instante, para que puedas compartir 
        rápidamente lo que quieras contar.</span></p>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer = ref(null);

onMounted(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainer.value,
        start: 'top center',
        end: 'center center',
        scrub: true
      }
    });

    tl.fromTo(
    ".highlight",
    { color: "black" },
    { color: "red", stagger: 1 }
    );
  });
</script>
  
  <style scoped>
  .text-container {
    height: 100vh;
    width: 100vw;
    font-size: var(--t-header2);
    background-color: var(--c-white);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .text-container p {
    padding: 0 10rem;
    line-height: 50px;
  }
  </style>
  