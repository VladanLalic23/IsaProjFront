<template>  
    <v-app>
            
        <HomeNavbar/>
        <v-main class="red lighten-5">
            <router-view/>  
        </v-main> 
    </v-app>
</template>

<script>
import HomeNavbar from '@/components/navbar/HomeNavbar.vue'

export default {
    name: 'HomePage',
    components: {
        HomeNavbar,
    },
    data(){
        return{
            image: {backgroundImage: "src/assets/background.jpg"}
        };
    },
}
</script>