import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FontAwesome from '../components/FontAwesome.vue'
import IconUnicode from '@/components/IconUnicode.vue'
import IconUnicodeEmoji from '@/components/IconUnicodeEmoji.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/icons',
      name: 'icons',
      component: FontAwesome,
    },
    {
      path: '/unicode',
      name: 'unicode',
      component: IconUnicode,
    },
    {
      path: '/unicode-emoji',
      name: 'unicode-emoji',
      component: IconUnicodeEmoji,
    },
  ],
})

export default router
