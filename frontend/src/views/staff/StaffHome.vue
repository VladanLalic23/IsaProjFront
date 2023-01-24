<template>  
    <v-app>    
        <StaffNavbar/>
        <v-main >
            <router-view/>  
        </v-main> 
    </v-app>
</template>

<script>

import StaffNavbar from '@/components/navbar/StaffNavbar.vue'

export default {
    name: 'StaffHome',
    components: {
        StaffNavbar,
    },
    data(){
        return{
        };
    },
    
}
</script>