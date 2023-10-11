<template>
    <div class="text-container" ref="textContainer">
      <p class="before-text">donde unos miran,<br>hay otros que ven</p>
      <p class="text" ref="text"><span class="highlight">Compartir al momento,</span><span class="highlight"> hablar con tu audiencia,</span><span class="highlight"> contarles 
        lo que haces en tiempo real es algo que está aquí.</span>
        <br>
        <br>
        <span class="highlight">
        Por eso nuestro servicio de grabación y edición 
        con smartphones de última generación es rápido,</span><span class="highlight"> 
        entregado casi al instante,</span><span class="highlight"> para que puedas compartir 
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
        end: 'bottom center',
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
  
  <style scoped lang="scss">
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-header1);
    background-color: var(--c-white);
    position: relative;
  }
  
  .text-container .text {
    padding: 6rem 3rem 10rem 3rem;
    line-height: 50px;
    font-family: var(--f-thin);
  }

  .before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0 3rem;
  }

  .before-text::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #F0444A;
  border-radius: 50%;
  position: absolute;
  left: 1.5rem;
  top: 0.07rem;
  z-index: 2;
  line-height: 0px;
}
  </style>
  