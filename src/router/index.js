import { createRouter, createWebHistory } from 'vue-router'
import { gsap } from 'gsap';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/screens',
      name: 'screens',
      component: () => import('../views/ScreensView.vue')
    },
    {
      path: '/cam',
      name: 'cam',
      component: () => import('../views/CamView.vue')
    },
    {
      path: '/blink',
      name: 'blink',
      component: () => import('../views/CamView2.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const curtains = document.querySelectorAll('.curtain-column');
  gsap.set(curtains, { y: '-100%' });

  gsap.to(curtains, {
    y: '0%',
    stagger: 0.2,
    duration: 0.5,
    onComplete: () => {
      // changing the route behind the curtains
      next();

      // Wait for a short delay before raising the curtains
      setTimeout(() => {
        gsap.to(curtains, {
          y: '-100%',
          stagger: 0.2,
          duration: 0.5
        });
      }, 100);
    }
  });
});



router.afterEach(() => {
  const curtains = document.querySelectorAll('.curtain-column');
  gsap.to(curtains, {
    delay: 0.5,
    y: '-100%',
    stagger: 0.2,
    duration: 0.5,
    onComplete: () => {
      allowNavigation = true;  // allow the next navigation
    }
  });
});

export default router
