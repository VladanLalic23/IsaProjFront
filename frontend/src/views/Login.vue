<template>
    <v-container>
        <v-layout class="my-10" justify-center>          
            <v-flex xs8 md6 lg4 xl4 sm6>
            <v-card color="light-green lighten-3" class="pa-3">
                <v-card-title>
                    <h3>Login</h3>
                </v-card-title>
                <v-form v-model="form.isFormValid">
                    <v-text-field v-model="form.email" :rules="rules.emailRules" label ="Email"></v-text-field>
                     <v-text-field v-model="form.password" :rules="rules.passwordRules" type="password" label ="Password"></v-text-field>                  
                    <v-btn color="lime lighten-3" allign-right @click="submit" :disabled="!form.isFormValid">Login</v-btn>
                    <v-spacer></v-spacer>
                </v-form>
            </v-card>   
         </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { setToken, getRole, removeToken } from '../security/token.js';

export default {
    name: 'Login',
    components: {
    },
    data() {
        return{
            form:{
                email:"",
                password:"",
                isFormValid: false,
                
            }, 
            rules:{
                emailRules : [
                    email => !!email || 'Email is required!',
                    email =>  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || 'Email must be valid!'
                ],
                passwordRules: [
                    password => !!password || 'Password is required!',
                ],
            },         
        }     
    },
    methods:{  
        submit(){
            let loginCredentials = {
                email: this.form.email,
                password: this.form.password
            }
            this.$http.post('auth/login', loginCredentials)
            .then(response =>{
                let token = response.data.accessToken;
                setToken(token);
                this.loadUserHomePage();
            }).catch(error => {
                if(error.response.status === 401){
                    this.snackbarText = "You have entered wrong email or password!";
                    this.snackbar = true;
                    this.resetInput();
                }else if(error.response.status === 500){
                    this.snackbarText = "Internal server error occurred!";
                    this.snackbar = true;
                }
            })
        },
        loadUserHomePage(){
            let role = getRole()
            if(role === "ROLE_DONOR"){
                this.$router.push('/donor')
            } else if(role === "ROLE_STAFF") {
                this.$router.push('/staff')
                } else {
                this.$router.push('/admin')
                }
            }
            
            
        },
        resetInput(){
            this.form.email = "";
            this.form.password = "";
        },
        logout() {
            removeToken();
        },   
}
</script>
