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
  
  gsap.registerPlugin(ScrollTrigger);
  
  const logoUrl = ref('src/assets/omol_b.svg');
  const logoUrlWhite = 'src/assets/omol_w.svg';
  
  const navbar = ref(null);
  
  const setLanguage = (lang) => {
    console.log(`Language set to: ${lang}`); // replace with language switch function
  };
  
  onMounted(() => {
    gsap.to(navbar.value, {
      scrollTrigger: {
        start: "top+=200",
        onToggle: self => {
          if (self.isActive) {
            navbar.value.style.backgroundColor = '#000';
            navbar.value.style.color = '#fff';
            logoUrl.value = logoUrlWhite;
          } else {
            navbar.value.style.backgroundColor = 'transparent';
            navbar.value.style.color = '#fff';
            logoUrl.value = 'src/assets/omol_b.svg';
          }
        },
        toggleActions: 'play none none reverse',
      },
    });
  });
  </script>
  
  
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: transparent;
    color: var(--c-black);
    transition: background-color 0.3s ease;
    z-index: 9999;
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    height: 30px; /* Adjust as necessary */
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
  