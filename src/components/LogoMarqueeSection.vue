<template>
    <section class="logo-marquee">
        <div class="logo-marquee__inner" aria-hidden="true" ref="inner">
          <div class="logo-marquee__part">
            one minute of love
          </div>
          <div class="logo-marquee__part">
            one minute of love
          </div>
          <div class="logo-marquee__part">
            one minute of love
          </div>
          <div class="logo-marquee__part">
            one minute of love
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
    
        let tween = gsap.to(".logo-marquee__part", {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "linear"
        }).totalProgress(0.5);
    
        gsap.set(".logo-marquee__inner", {
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
    @font-face {
    font-family: Narnia;
    src: url("/font/Narnia.otf") format("opentype");
    }

    .logo-marquee__part {
      flex-shrink: 0;
      padding: 0 60px;
      font-smooth: always;
      font-size: 15rem;
      font-family: 'Narnia', serif;
    }
    
    .logo-marquee {
      background: var(--c-white);
      color: var(--c-black);
      text-transform: uppercase;
      padding: 32px 0;
      position: relative;
      overflow: hidden;
    }
    
    .logo-marquee__inner {
      -webkit-font-smoothing: antialiased;
        width: fit-content;
        display: flex;
        flex: auto;
        flex-direction: row;
    }
    
    @media(max-width: 767px) {
      .logo-marquee__part {
        font-size: 10rem !important;
    }
    }
    </style>
    