<template>
  <v-app-bar app> 
          <v-toolbar style='position:fixed' class="ml-n4" width="100%">
              <v-toolbar-title class="text-uppercase" style="cursor: pointer" @click="$router.push('/').catch(()=>{})">
                  <span>Klinika</span>
                  <span class="font-weight-light">Doniraj za zivot</span>
              </v-toolbar-title>
              <v-btn class="ml-5" @click="$router.push('/donor/clinic').catch(()=>{})">
                  <span>Clinic</span>
              </v-btn>
              <v-btn class="ml-5"  @click="$router.push('/donor/profile').catch(()=>{})">
                  <span>Profil</span>
              </v-btn>
              <v-btn class="ml-5" @click="$router.push('/donor/appointments').catch(()=>{})">
                    <span>Appointments</span>
                </v-btn>
                <v-btn class="ml-5" @click="$router.push('/donor/form').catch(()=>{})">
                    <span>Form</span>
              </v-btn>
              <v-btn class="ml-5" @click="$router.push('/donor/complaints').catch(()=>{})">
                    <span>Complaints</span>
              </v-btn>
                <v-btn class="ml-5" @click="logout">
                    <span>Logout</span>
                </v-btn>  
          </v-toolbar>
      
      </v-app-bar>
</template>

<script>

import {  removeToken } from '../../security/token.js';

export default {
    name: 'DonorNavbar',
    components: {
    
    },
    methods: {
        logout() {
            removeToken();
            this.$router.push('/').catch(()=>{})
        }
    }
    }

</script>
