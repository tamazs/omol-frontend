import { createRouter, createWebHistory } from 'vue-router'
import { gsap } from 'gsap';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/',
      name: 'start',
      component: () => import('../views/StartView.vue')
    },
    {
      path: '/screens',
      name: 'screens',
      component: () => import('../views/ScreensView.vue')
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
      path: '/othercamtesting',
      name: 'othercamtesting',
      component: () => import('../views/CamView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue')
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
  ]
})

/* router.beforeEach((to, from, next) => {
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
}); */



/* router.afterEach(() => {
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
 */
export default router
