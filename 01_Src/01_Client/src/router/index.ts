/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-02-21 13:34:38                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-02 14:23:15                              *
 *                                                                           *
 ****************************************************************************/

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/signup/Signup.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/projects/Projects.vue'),
  },
  {
    path: '/:type/:id',
    name: 'project',
    component: () => import('../views/project/Project.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
        {
            path: 'test',
            name: 'test app',
            component: () => import('../views/testView.vue')
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
