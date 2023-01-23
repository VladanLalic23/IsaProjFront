<template>  
    <v-app>    
        <DonorNavbar/>
        <v-main >
            <router-view/>  
        </v-main> 
    </v-app>
</template>

<script>

import DonorNavbar from '@/components/navbar/DonorNavbar.vue'

export default {
    name: 'DonorHome',
    components: {
        DonorNavbar,
    },
    data(){
        return{

        };
    },
    
}
</script>
