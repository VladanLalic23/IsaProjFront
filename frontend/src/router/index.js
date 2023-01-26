import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DonorHome from '@/views/donor/DonorHome.vue'
import Clinic from '@/views/Clinic.vue'
import DonorAppointments from '@/views/donor/DonorAppointments.vue'
import Form from '@/views/donor/Form.vue'
import ScheduleAppointment from '@/views/donor/ScheduleAppointment.vue'
import ScheduleAppointment2 from '@/views/donor/ScheduleAppointment2.vue'
import Profile from '@/views/donor/DonorProfil.vue'
import StaffHome from '@/views/staff/StaffHome.vue'
import StaffAppointments from '@/views/staff/Appointments.vue'
import Complaint from '@/views/donor/Complaint.vue'




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
      },
      {
        path: 'clinic',
        component: Clinic,
        name: 'clinic',
      },
    ]
  },
    {
      path: '/donor',
      component: DonorHome,
      name: 'donorHome',
      meta: {
        requiresAuthorization: true,
        role: 'ROLE_DONOR'
      }, 
      children:[
        {
          path: 'clinic',
          component: Clinic,
          name: 'clinic',
        },
        {
          path: 'appointments',
          component: DonorAppointments,
          name: 'appointments',
        },
        {
          path: 'form',
          component: Form,
          name: 'form',
        },
        {
          path: 'profile',
          component: Profile,
          name: 'profile',
        },
        {
          path: 'schedule-appointment',
          component: ScheduleAppointment,
          name: 'schedule-appointment',
        },
        {
          path: 'schedule-appointment2',
          component: ScheduleAppointment2,
          name: 'schedule-appointment2',
        },
        {
          path: 'complaints',
          component: Complaint,
          name: 'Complaints',
        },
      ],
      },
  {
    path: '/staff',
      component: StaffHome,
      name: 'stafHome',
      meta: {
        requiresAuthorization: true,
        role: 'ROLE_STAFF'
      },
      ]
  }
    

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