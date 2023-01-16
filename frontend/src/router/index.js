import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomePage from '@/views/HomePage.vue'

import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'homePage'
    ,
    children:[
      {
        path: 'register',
        component: Register,
        name: 'register'
        } 
      ]}
    ]

const router = new VueRouter({
  routes
})



export default router