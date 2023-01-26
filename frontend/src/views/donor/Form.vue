<template>
    <v-container>
        <v-layout class="my-10" justify-center>          
            <v-flex xs8 md6 lg4 xl4 sm6>
            <v-card class="pa-3">
                <v-card-title>
                    <h3>Popunjavanje forme</h3>
                </v-card-title>
                <v-snackbar v-model="snackbar" top timeout="3500">
                     <span>{{snackbarText}}</span>
                     </v-snackbar>
                <v-form v-model="form.isFormValid">
                    <v-row>
                        <h2>Da li savesno popunjavate formu?</h2>
                        <v-radio-group v-model="form.answer">
                        <v-radio label="Da" value="true"/>
                        <v-radio label="Ne" value="false"/>
                        </v-radio-group>
                    </v-row>
                    <v-btn @click="submit">Predaj</v-btn>
                    <v-spacer></v-spacer>
                </v-form>
            </v-card>
         </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
import {  getId,getToken } from '../../security/token.js'

export default {
    name: 'Form',
    components: {
        
    },
    data(){
        return{
            form:{
                answer: "",
            },
            rules:{      
            },
            snackbar: false,
            snackbarText: ""
        }
    },
    methods: {
        submit() {
         if (this.form.answer == 'true') {
        this.$http.get('donor/form/'+ getId(), {
         headers: {
                Authorization: 'Bearer ' + getToken()
         }
         })
         .then(response => {
                console.log(response.data);
                this.snackbarText = "Upitnik uspesno popunjen!";
                this.snackbar = true;
                 setTimeout(() => { this.$router.push({path: '/donor'})}, 2000);
              })
             } else {
             console.log(this.form.answer);
             this.snackbarText = "Niste uspesno popunili upitnik";
             this.snackbar = true;
             setTimeout(() => { this.$router.push({path: '/donor'})}, 2000);
    }
}}}
       
    

</script>
