<template>  
    <v-app>    
        <AdminNavbar/>
        <v-main >
            <router-view/>  
        </v-main> 
    </v-app>
</template>

<script>

import AdminNavbar from '@/components/navbar/AdminNavbar.vue'

export default {
    name: 'AdminHome',
    components: {
        AdminNavbar,
    },
    data(){
        return{
        };
    },
    
}
</script>