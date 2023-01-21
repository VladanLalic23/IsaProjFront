import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import { getToken, getRole } from '../security/token.js';

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'homePage'
    ,
    children:[
      {
        path: 'login',
        component: Login,
        name: 'login',
      },
      {
        path: 'register',
        component: Register,
        name: 'register',
      }
         
      ]}
    ]

    const router = new VueRouter({
      routes
    })
    
    router.beforeEach((to, from, next) =>{
      let jwt = getToken();
      if (to.matched.some(record => record.meta.requiresAuthorization)) {
        if (jwt == null) {
          next({ path: '/login' });
        }else {
          if(to.matched.some(record => record.meta.role && record.meta.role != getRole())){
            next({ path: '/login' });
          }else {
            next()
          }   
        }
      }else {
        next()
      }
      if(to.matched.some(record => record.meta.guest)) { 
        if (getToken() != null) {
            next(getHomePage(getRole()))
          } else {
            next()
          }
      }else {
        next()
      }
    })
    
    function getHomePage(role) {
      if (role == 'ROLE_DONOR'){
        return "/donor"
      }else if (role == 'ROLE_STAFF') {
        return "/staff"
      }else if (role == 'ROLE_ADMIN') {
        return "/clinic-admin"
      }else {
        return "/"
      }
    }


export default router