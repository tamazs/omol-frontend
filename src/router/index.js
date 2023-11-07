import { createRouter, createWebHistory } from 'vue-router'
import { gsap } from 'gsap';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/',
      name: 'start',
      component: () => import('../views/StartView.vue'),
    },
    {
      path: '/screens',
      name: 'screens',
      component: () => import('../views/CamScreenView.vue')
    },
    {
      path: '/cam',
      name: 'cam',
      component: () => import('../views/CamView2.vue')
    },
    {
      path: '/result/:timerValue',
      name: 'result',
      props: true,
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/member/:id',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/:notFound',
      name: 'notFound',
      component: () => import('../views/404.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If there is a saved position, scroll to that position
      return savedPosition;
    } else if (to.hash) {
      // If the target route has a hash, scroll to the element with that ID
      return { el: to.hash, behavior: 'smooth' };
    } else {
      // If there is no saved position and no hash, scroll to the top of the page
      return { top: 0, behavior: 'smooth' };
    }
  }
})

const screenWidth = window.innerWidth;

const pathsToRedirect = ['/', '/start', '/screens', '/cam', '/result/:timerValue'];

if (screenWidth < 1000) {
  router.beforeEach((to, from, next) => {
    if (pathsToRedirect.includes(to.path)) {
      next('/home');
    } else {
      next();
    }
  });
}

router.beforeEach((to, from, next) => {
  const curtains = document.querySelector('.curtain-column');

  // Set initial opacity to 0 and visibility to visible
  gsap.set(curtains, { opacity: 0, visibility: 'visible' });

  // Fade in the curtains
  gsap.to(curtains, {
    opacity: 1,
    visibility: 'visible',
    duration: 0.7,
    onComplete: () => {
      // Change the route behind the curtains
      next();
    }
  });
});

router.afterEach(() => {
  const curtains = document.querySelector('.curtain-column');

  // Fade out the curtains with a consistent duration and ease
  gsap.to(curtains, {
    opacity: 0,
    duration: 0.7, // Use a consistent duration
    ease: 'ease-in-out', // Use a consistent ease
    onComplete: () => {
      curtains.style.visibility = 'hidden'; // Set visibility to hidden after opacity animation
    }
  });
});

export default router
