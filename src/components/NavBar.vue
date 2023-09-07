<template>
    <nav ref="navbar" class="navbar">
      <div class="nav-content">
        <div class="logo">
          <img :src="logoUrl" alt="Logo" />
        </div>
        <div class="nav-links">
          <div class="pages">
            <a href="#projects">Projects</a>
            <a href="#team">Team</a>
          </div>
          <div class="languages">
            <button @click="setLanguage('EN')">EN</button>
            <button @click="setLanguage('ES')">ES</button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import logoBlack from '@/assets/omol_b.svg';
  
  gsap.registerPlugin(ScrollTrigger);
  
  const navbar = ref(null);
  const logoUrl = ref(logoBlack);
  
  onMounted(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: 200,
        scrub: true
      }
    });
    
    tl.to(navbar.value, { backgroundColor: 'black', color: 'white', duration: 0.3 });
    tl.to('.logo', { filter: 'invert(1)', duration: 0.3 }, 0);
  });
  </script>
    
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: transparent;
    color: white;
    z-index: 999;
    padding: 20px;
  }
  
  .logo img {
    height: 30px; 
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .pages a {
    margin-right: 20px;
    color: inherit;
    text-decoration: none;
  }
  
  .languages button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }
  </style>