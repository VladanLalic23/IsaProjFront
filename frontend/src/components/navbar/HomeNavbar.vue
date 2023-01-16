<template>
    <v-app-bar app> 
            <v-toolbar color="light-red lighten-3" style='position:fixed' class="ml-n4" width="100%">
                <v-toolbar-title class="text-uppercase" style="cursor: pointer" @click="$router.push('/').catch(()=>{})">
                    <span>Klinika</span>
                    <span class="font-weight-light">Doniraj za zivot</span>
                </v-toolbar-title>
                <v-btn class="ml-5" color="lime lighten-3" @click="$router.push('/login').catch(()=>{})">
                    <v-icon>mdi-login</v-icon>
                    <span>Login</span>
                </v-btn>
                <v-btn class="ml-5" color="lime lighten-3" @click="$router.push('/register').catch(()=>{})">
                    <v-icon>mdi-account-plus</v-icon>
                    <span>Register</span>
                </v-btn>
            </v-toolbar>
        
        </v-app-bar>
</template>

<script>

export default {
    name: 'HomeNavbar',
    components: {
    
    },
}
</script>
