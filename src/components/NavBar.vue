<template>
    <nav ref="navbar" class="navbar">
      <div class="nav-content">
        <div class="mobile-nav">
          <div class="logo">
            <img :src="whiteLogoUrl" alt="Logo" />
          </div>
          <div class="burger-menu" @click="toggleMenu">
            <i class="fas fa-heart"></i>
          </div>
        </div>
        <div ref="menuContainer" class="menu-container">
          <div class="menu-header">
            <div class="logo">
              <img :src="whiteLogoUrl" alt="Logo" />
            </div>
            <div @click="toggleMenu">
              <i class="fas fa-x"></i>
            </div>
          </div>
          <div class="nav-links">
            <div class="mobile-pages">
              <a href="#" @click="toggleMenu">Home</a>
              <a href="#projects" @click="toggleMenu">Projects</a>
              <a href="#team" @click="toggleMenu">Team</a>
            </div>
            <div class="languages">
              <button @click="setLanguage('es')">ES</button>
              <button @click="setLanguage('en')">EN</button>
            </div>
          </div>
        </div>
        <div class="desktop-nav">
          <div class="logo">
            <img :src="logoUrl" alt="Logo" />
          </div>
          <div class="nav-links">
            <div class="pages">
              <a href="#projects">Projects</a>
              <a href="#team">Team</a>
            </div>
            <div class="languages">
              <button @click="setLanguage('es')">ES</button>
              <button @click="setLanguage('en')">EN</button>
            </div>
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
import logoWhite from '@/assets/omol_w.svg';
import { useI18n } from 'vue-i18n';
import project from '../modules/project';
import { store } from '@/store';
const { pState, getProjects } = project()


gsap.registerPlugin(ScrollTrigger);

const navbar = ref(null);
const menuContainer = ref(null);
const logoUrl = ref(logoBlack);
const whiteLogoUrl = ref(logoWhite);

const { locale } = useI18n(); 

const setLanguage = (lang) => {
  store.lang = lang;
  locale.value = lang;
};

onMounted(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: 200,
        scrub: true,
      }
    });

    // Changes navbar background to black as the user scrolls down
    tl.to(navbar.value, { backgroundColor: 'black', duration: 0.3 });
    
    // Inverts colors of the desktop nav logo and icon as the user scrolls down
    tl.to('.desktop-nav .logo img, .desktop-nav .burger-menu i', { filter: 'invert(1)', duration: 0.3 }, 0);
    tl.to('.desktop-nav .nav-links .pages a', { color: 'white', duration: 0.3 }, 0);
    tl.to('.desktop-nav .nav-links .languages button', { color: 'white', duration: 0.3 }, 0);
});

// Function to toggle the visibility of the menu on mobile
function toggleMenu() {
    const isOpening = menuContainer.value.style.right !== '0px';
    
    gsap.to(menuContainer.value, {
      right: isOpening ? '0px' : '-100vw',
      duration: 0.3,
      onComplete: () => {
        if (isOpening) {
          // Animating the opacity of menu header and nav links to 1 if the menu is opening
          gsap.to(".menu-header, .nav-links", { opacity: 1, duration: 0.3 });
        }
      },
      onStart: () => {
        if (!isOpening) {
          // Setting the opacity of menu header and nav links to 0 if the menu is closing
          gsap.set(".menu-header, .nav-links", { opacity: 0 });
        }
      }
    });
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: transparent;
  z-index: 999;
  padding: 20px;
}

.desktop-nav, .mobile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desktop-nav .nav-links {
  flex-direction: row;
}

.desktop-nav .pages {
  display: flex;
  gap: 20px;
  margin-right: 30px;
}

.mobile-nav {
  display: none;
}

.menu-container .menu-header, 
.menu-container .nav-links {
  opacity: 0;
  transition: opacity 0.3s;
}

.logo img {
  height: 30px;
}

.burger-menu {
  font-size: 24px;
  cursor: pointer;
  color: var(--c-white);
}

.menu-container {
  position: fixed;
  top: 0;
  right: -100vw;
  width: 100vw;
  height: 100vh;
  background: var(--c-black);
  color: var(--c-white);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.pages a, .languages button {
  margin: 10px 0;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-black);
}

@media(max-width: 767px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: flex;
  }

  .mobile-pages {
    display: flex;
    flex-direction: column;
  }

  .mobile-nav .logo img {
    filter: none;
  }

  .mobile-pages a {
    color: var(--c-white);
    font-size: 1.5em;
    text-decoration: none;
    text-align: center;
    padding: 10px;
  }

  .nav-links {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .languages button {
    color: var(--c-white);
  }
}
</style>
