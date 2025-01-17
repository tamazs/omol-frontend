<template>
  <nav ref="navbar" class="navbar">
    <div class="nav-content">
      <div class="mobile-nav">
        <router-link to="/home" class="home">
          <div class="logo">
            <img :src="logoUrl" alt="Logo of OMOL" />
          </div>
        </router-link>
        <div class="burger-menu" @click="toggleMenu">
          <i class="fas fa-heart"></i>
        </div>
      </div>
      <div ref="menuContainer" class="menu-container">
        <div class="menu-header">
          <router-link to="/home">
            <div class="logo">
              <img :src="whiteLogoUrl" alt="Logo of OMOL" />
            </div>
          </router-link>
          <div @click="toggleMenu">
            <i class="fas fa-x"></i>
          </div>
        </div>
        <div class="nav-links">
          <div class="mobile-pages">
            <a href="/home#sendLove">Send love</a>
            <router-link to="/projects"
              :class="{ 'active-link': $route.path === '/projects' || $route.path.startsWith('/project/') }">{{
                $t('navbar.projects') }}</router-link>
            <router-link to="/about" :class="{ 'active-link': $route.path === '/about' }">{{ $t('navbar.about')
            }}</router-link>
            <router-link to="/team" :class="{ 'active-link': $route.path === '/team' }">{{ $t('navbar.team')
            }}</router-link>
          </div>
          <div class="languages" v-if="!isProjectOrMemberRoute">
            <button @click="setLanguage('es')">ES</button>
            <button @click="setLanguage('en')">EN</button>
          </div>
        </div>
      </div>
      <div class="desktop-nav">
        <router-link to="/home" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">
          <div class="logo">
            <img :src="logoUrl" alt="Logo" />
          </div>
        </router-link>
        <div class="nav-middle">
          <div class="pages">
            <router-link to="/projects"
              :class="{ 'active-link': $route.path === '/projects' || $route.path.startsWith('/project/') }" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">{{
                $t('navbar.projects') }}</router-link>
            <router-link to="/about" :class="{ 'active-link': $route.path === '/about' }" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">{{ $t('navbar.about')
            }}</router-link>
            <router-link to="/team" :class="{ 'active-link': $route.path === '/team' }" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">{{ $t('navbar.team')
            }}</router-link>
            <router-link to="/home#sendLove" @click="scrollToSendLove" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">Send love</router-link>
          </div>
        </div>
        <div class="social-icons">
          <a href="https://vimeo.com/goodsightmedia" target="_blank"><i class="fab fa-vimeo"></i></a>
          <a href="https://www.instagram.com/omolvideo/" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://www.youtube.com/@omolvideo/videos" target="_blank"><i class="fab fa-youtube"></i></a>
          <a href="https://www.linkedin.com/company/goodsight/" target="_blank"><i class="fab fa-linkedin"></i></a>
        </div>
        <div class="languages" v-if="!isProjectOrMemberRoute">
          <button @click="setLanguage('es')" :class="{ 'active-language': locale === 'es' }" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">ES</button>
          <button @click="setLanguage('en')" :class="{ 'active-language': locale === 'en' }" @mouseenter="playSound" @mouseleave="stopSound" @mousedown="playMouseDownSound" @mouseup="stopMouseDownSound">EN</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoBlack from '@/assets/omol_b.svg';
import logoWhite from '@/assets/omol_w.svg';
import { useI18n } from 'vue-i18n';
import { store } from '@/store';
import { useRouter } from 'vue-router';
import tickSound from '@/assets/tick4.mp3';
import tickSoundMouseDown from '@/assets/tick1.mp3';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const navbar = ref(null);
const menuContainer = ref(null);
const logoUrl = ref(logoBlack);
const whiteLogoUrl = ref(logoWhite);

const { locale } = useI18n();

const setLanguage = (lang) => {
  store.lang = lang;
  locale.value = lang;
};

/* onMounted(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 900,
        end: 1400,
        scrub: true,
      }
    });

    // Changes navbar background to black as the user scrolls down
    tl.to(navbar.value, { backgroundColor: 'black', duration: 0.3 });
    
    // Inverts colors of the desktop nav logo and icon as the user scrolls down
    tl.to('.desktop-nav .logo img, .desktop-nav .burger-menu i', { filter: 'invert(1)', duration: 0.3 }, 0);
    tl.to('.desktop-nav .nav-links .pages a', { color: 'white', duration: 0.3 }, 0);
    tl.to('.desktop-nav .nav-links .languages button', { color: 'white', duration: 0.3 }, 0);
}); */

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

function closeMenu() {
  // Close the menu and restore body overflow
  gsap.to(menuContainer.value, {
    right: '-100vw',
    duration: 0.3,
    onComplete: () => {
      gsap.set(".menu-header, .nav-links", { opacity: 0 });
      document.body.style.overflow = 'auto';
    },
  });
}

router.beforeEach((to, from, next) => {
  // Close the menu when the route changes
  closeMenu();
  next();
});

const isProjectOrMemberRoute = computed(() => {
  const currentRoute = router.currentRoute.value;
  return currentRoute.path.startsWith('/member/') || currentRoute.path.startsWith('/project/');
});

function scrollToSendLove() {
  setTimeout(() => {
  const element = document.getElementById('sendLove');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}, 1000)};

const audio = new Audio(tickSound);
const audioMouseDown = new Audio(tickSoundMouseDown);

const playSound = () => {
  audio.play();
};

const stopSound = () => {
  audio.pause();
  audio.currentTime = 0;
};

const playMouseDownSound = () => {
  audioMouseDown.play();
};

const stopMouseDownSound = () => {
  audioMouseDown.pause();
  audioMouseDown.currentTime = 0;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: transparent;
  z-index: 9999;
  padding: 20px;
  font-family: var(--f-regular);
}

.desktop-nav,
.mobile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-middle {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.desktop-nav .nav-links {
  flex-direction: row;
}

.desktop-nav .pages {
  display: flex;
  text-transform: uppercase;
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
  cursor: url('../assets/cursor.png'), auto;
  color: var(--c-black);
}

.logo {
  cursor: url('../assets/cursor.png'), auto;
}

.menu-container {
  position: fixed;
  top: 0;
  right: -100vw;
  width: 100vw;
  height: 100vh;
  background: #2B2B2B;
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
  cursor: url('../assets/cursor.png'), auto;
}

.nav-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.languages button {
  margin: 10px 0;
  text-decoration: none;
  background: none;
  border: none;
  cursor: url('../assets/cursor.png'), auto;
  color: var(--c-black);
  font-size: var(--t-body);
}

.social-icons {
  font-size: var(--t-header3);
  display: flex;
  gap: 20px;
  margin: 10px 0;
  display: none;
}

.social-icons a {
  color: var(--c-black);
  cursor: url('../assets/cursor.png'), auto;
}

.pages {
  display: flex;
  align-items: center;
}

.pages a {
  margin: 10px 0;
  text-decoration: none;
  background: none;
  cursor: url('../assets/cursor.png'), auto;
  color: var(--c-black);
  border: 2px transparent solid;
  border-radius: 50%;
  padding: 0.8rem 1.4rem;
}

.pages a.router-link-active {
  border: 2px var(--c-red) solid;
}

.pages a:hover {
  color: var(--c-red);
}

.languages button.active-language {
  color: var(--c-red);
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
    text-transform: uppercase;
    margin-top: 4rem;
  }

  .mobile-nav .logo img {
    filter: none;
  }

  .mobile-pages a {
    color: var(--c-white);
    font-size: var(--t-bigText);
    font-family: var(--f-light);
    text-decoration: none;
    padding: 1rem 1rem;
  }

  .nav-links {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .languages button {
    color: var(--c-white);
    padding: 2rem 2rem;
  }

  .languages {
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-bottom: 10rem;
  }
}
</style>
