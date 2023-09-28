<template>
    <section class="bottom">
        <div class="bottom__inner" aria-hidden="true" ref="inner">
          <div class="bottom__part">
            entregamos en 8 horas
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
          <div class="bottom__part">
            entregamos en 8 horas 
          </div>
        </div>
    </section>
    </template>
    
    <script setup>
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    
    onMounted(() => {
        let currentScroll = 0;
        let isScrollingDown = true;
    
        let tween = gsap.to(".bottom__part", {
            xPercent: -100,
            repeat: -1,
            duration: 10,
            ease: "linear"
        }).totalProgress(0.5);
    
        gsap.set(".bottom__inner", {
            xPercent: -50
        });
    
        window.addEventListener("scroll", function() {
            if (window.scrollY > currentScroll) {
                isScrollingDown = true;
            } else {
                isScrollingDown = false;
            }
    
            gsap.to(tween, {
                timeScale: isScrollingDown ? 1 : -1
            });
    
            currentScroll = window.scrollY;
        });
    });
    </script>
    
    <style>
    .bottom__part {
      flex-shrink: 0;
      padding: 0 30px;
      font-smooth: always;
      font-size: var(--t-body);
    }
    
    .bottom {
      background: var(--c-black);
      color: var(--c-white);
      text-transform: uppercase;
      padding: 10px 0;
      overflow: hidden;
      position: fixed;
        bottom: 0;
        width: 100vw;
        z-index: 9999;
    }
    
    .bottom__inner {
      -webkit-font-smoothing: antialiased;
        width: fit-content;
        display: flex;
        flex: auto;
        flex-direction: row;
    }
    
    @media(max-width: 767px) {
      .bottom__part {
      padding: 0 30px;
      font-size: var(--t-body);
    }
    }
    </style>
    