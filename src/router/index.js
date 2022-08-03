import { createRouter, createWebHashHistory } from 'vue-router'
import { Auth } from 'aws-amplify'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },  
  {
    path: '/recherche/:name',
    name: 'recherche',
    component: () => import(/* webpackChunkName: "about" */ '../views/Recherche.vue')
  },
  {
    path: '/product/:name',
    name: 'product',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue')
  },
  {
    path: '/categorie/:name',
    name: 'categorie',
    component: () => import(/* webpackChunkName: "about" */ '../views/CategoryView.vue')
  },  
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderView.vue')
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: () => import(/* webpackChunkName: "about" */ '../views/CgvView.vue')
  },
  {
    path: '/client',
    name: 'client',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientView.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  { path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/404View.vue'),
  },  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to,from,savedPosition){
    return new Promise((resolve, ) => {
      setTimeout(() => {
        resolve(savedPosition?savedPosition:{ top: 0 })
      }, 300)
    })
  }
})
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser().then(() => {
      next()
    }).catch(() => {
      next('/login');
    })
    return
  }
  next()
})
router.afterEach(() => {
  document.getElementById('showcateg').classList.remove('show')
  document.getElementById('closemenu').click()
})
export default router
