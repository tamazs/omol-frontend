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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textContainer = ref(null);

let tl;

onMounted(() => {
    tl = gsap.timeline({
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

  onBeforeUnmount(() => {
  // Kill the timeline and ScrollTrigger instance when the component is unmounted
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  tl.kill();
});
</script>
  
  <style scoped>
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-header2);
    background-color: var(--c-white);
  }
  
  .text-container p {
    padding: 10rem;
    line-height: 50px;
  }
  </style>
  