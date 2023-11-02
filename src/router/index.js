import { createRouter, createWebHistory } from 'vue-router'
import { gsap } from 'gsap';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'begin',
      redirect: '/start'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartView.vue'),
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
    } else {
      // If there is no saved position, scroll to the top of the page
      return { top: 0 };
    }
  }
})

const screenWidth = window.innerWidth;

const pathsToRedirect = ['/', '/screens', '/cam', '/result/:timerValue'];

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
  const curtains = document.querySelectorAll('.curtain-column');
  gsap.set(curtains, { y: '-100%' });

  gsap.to(curtains, {
    y: '0%',
    duration: 1,
    onComplete: () => {
      // changing the route behind the curtains
      next();

      // Wait for a short delay before raising the curtains
      setTimeout(() => {
        gsap.to(curtains, {
          y: '-100%',
          duration: 1
        });
      }, 1000);
    }
  });
});



router.afterEach(() => {
  const curtains = document.querySelectorAll('.curtain-column');
  gsap.to(curtains, {
    delay: 1,
    y: '-100%',
    duration: 1,
    onComplete: () => {
      allowNavigation = true;  // allow the next navigation
    }
  });
});

export default router
