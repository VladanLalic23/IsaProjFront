<template>
    <v-container>
        <v-layout class="my-10" justify-center>          
            <v-flex xs8 md6 lg4 xl4 sm6>
            <v-card class="pa-2">
                <v-card-title>
                    <h3>My profile</h3>
                </v-card-title>
                <v-row>
                    <v-col>
                        <span style="font-weight:bold">Loyalty points: </span>
                        <span>{{donorProfileDTO.loyaltyPoints}}</span>
                    </v-col>
                    <v-col>
                        <span style="font-weight:bold">Penalty points: </span>
                        <span>{{donorProfileDTO.penaltyPoints}}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <span style="font-weight:bold">Donor category: </span>
                        <span>{{donorProfileDTO.donorCategory}}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <span style="font-weight:bold">Name: </span>
                        <span>{{donorProfileDTO.name}}</span>
                    </v-col>
                    <v-col>
                        <span style="font-weight:bold">Surname: </span>
                        <span>{{donorProfileDTO.surname}}</span>
                    </v-col>
                </v-row>
                <br>
                <v-snackbar v-model="snackbar" top timeout="2500">
                     <span>{{snackbarText}}</span>
                </v-snackbar>
                <v-form v-model="form.isFormValid">
                    <v-text-field label ="Name" v-model="form.name" :rules="rules.nameRules"></v-text-field>   
                    <v-text-field label ="Surname" v-model="form.surname" :rules="rules.surnameRules"></v-text-field>
                    <v-text-field label ="Street name" v-model="form.streetName" :rules="rules.streetNameRules"></v-text-field>
                    <v-text-field label ="Street number" v-model="form.streetNumber" :rules="rules.streetNumberRules"></v-text-field>
                    <v-text-field label ="Flat number" v-model="form.flatNumber" :rules="rules.flatNumberRules"></v-text-field>
                    <v-text-field label ="City" v-model="form.city" :rules="rules.cityRules"></v-text-field>     
                    <v-text-field label ="Postal code" v-model="form.postalCode" :rules="rules.postalCodeRules"></v-text-field> 
                    <v-text-field label ="Country" v-model="form.country" :rules="rules.countryRules"></v-text-field>  
                    <v-text-field label ="Phone number" v-model="form.phoneNumber" :rules="rules.phoneNumberRules"></v-text-field>
                    <v-text-field label="Profession" v-model="form.profession" :rules="rules.professionRules"></v-text-field>
                    <v-text-field label ="Information" v-model="form.information" :rules="rules.informationRules"></v-text-field>       
                    <v-btn  allign-right :disabled="!form.isFormValid" @click="submit">Update</v-btn>
                    <v-spacer></v-spacer>
                </v-form>
            </v-card>
         </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { getId, getToken } from '../../security/token.js';

export default {
    name: 'DonorProfile',
    components: {  
    },
    mounted() {
        this.loadUserData();
        this.loadDonorProfileData();
    },
    data(){
        return{
            form:{
                name: "",
                surname:"",
                gender: "",
                profession: "",
                info:"",
                streetName:"",
                streetNumber:"",
                flatNumber:"",
                city:"",
                postalCode:"",
                country:"",
                phoneNumber:"",
                isFormValid: false,
            },
            rules:{
                nameRules: [
                        name => !!name || 'Name is required!',
                        name => /^[A-Za-z\s]+$/.test(name) || 'Name must contain only letters!'
                ],
                surnameRules: [
                        surname => !!surname || 'Surname is required!',
                        surname => /^[A-Za-z\s]+$/.test(surname) || 'Surname must contain only letters!'
                ],
                professionRules: [
                profession => !!profession || 'Profession is required!',
                profession => /^[A-Za-z\s]+$/.test(profession) || 'Profession must contain only letters!'
                ],
                informationRules: [
                    information => !!information || 'Information is required!',
                    information => /^[A-Za-z\s]+$/.test(information) || 'Information must contain only letters!'
                ],
                streetNameRules: [
                        streetName => !!streetName || 'Street name is required!',
                        streetName => /^[A-Za-z\s]+$/.test(streetName) || 'Street name must contain only letters!'
                ],
                streetNumberRules: [
                        streetNumber => !!streetNumber || 'Street number is required!',
                        streetNumber => /^[0-9]+$/.test(streetNumber) || 'Street number must contain only numbers!'
                ],
                flatNumberRules: [
                        flatNumber => !!flatNumber || 'Flat number is required!',
                        flatNumber => /^[0-9]+$/.test(flatNumber) || 'Flat number must contain only numbers!'
                ],
                cityRules: [
                        city => !!city || 'City is required!',
                        city => /^[A-Za-z\s]+$/.test(city) || 'City must contain only letters!'
                ],
                postalCodeRules: [
                        postalCode => !!postalCode || 'Postal code is required!',
                        postalCode => /^[0-9]+$/.test(postalCode) || 'Postal code must contain only numbers!'
                ],
                countryRules: [
                        country => !!country || 'Country is required!',
                        country => /^[A-Za-z\s]+$/.test(country) || 'Country must contain only letters!'
                ],
                phoneNumberRules: [
                        phoneNumber => !!phoneNumber || 'Phone number is required!',
                        phoneNumber => /^[0-9\s]+$/.test(phoneNumber) || 'Phone number must contain only numbers!'
                ],
            },
            snackbar: false,
            snackbarText : "",
            user: {},
            donorProfileDTO : {}
        }
    },
    methods: {
        submit(){
            let userUpdateDTO = {
                id: getId(),
                name: this.form.name,
                surname: this.form.surname,
                profession: this.form.profession,
                info: this.form.info,
                country: this.form.country,
                city: this.form.city,
                postalCode: this.form.postalCode,
                streetNumber: this.form.streetNumber,
                flatNumber: this.form.flatNumber,
                streetName: this.form.streetName,
                phoneNumber: this.form.phoneNumber,
                initialPasswordChanged: true,
            }
            this.$http.put('user/update',          
                userUpdateDTO
                ,
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            ).then(response=>{
                console.log(response.data);
                this.snackbarText = "Your account has been successfuly updated!";
                this.snackbar = true;
                setTimeout(() => { this.$router.push('/donor')}, 2500);
            }).catch(error => {
                if(error.response.status === 500){
                    this.snackbarText = "Internal server error occurred!";
                    this.snackbar = true;
                }
            })
        },
        loadUserData () {
            this.$http.get('user/find-by-id/' + getId(),
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            ).then(response => {
                this.user = response.data;
                this.form.name = this.user.name;
                this.form.surname = this.user.surname;
                this.form.profession=this.user.profession;
                this.form.info=this.user.info;
                this.form.gender = this.user.gender;
                this.form.streetName = this.user.streetName;
                this.form.streetNumber = this.user.streetNumber;
                this.form.flatNumber = this.user.flatNumber;
                this.form.city = this.user.city;
                this.form.postalCode = this.user.postalCode;
                this.form.country = this.user.country;
                this.form.phoneNumber = this.user.phoneNumber;
                this.form.isFormValid = this.user.isFormValid;
                
            }).catch(error => {
                if(error.response.status === 500){
                    this.snackbarText = "Internal server error occurred!";
                    this.snackbar = true;
                }
                if(error.response.status === 401){
                   this.snackbar = true
                   this.snackbarText = "You are unauthorized to get donor informations!";
                }
            })
        },
        loadDonorProfileData(){
            this.$http.get('donor/profile-info/' + getId(),
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            ).then(response => {
                this.donorProfileDTO = response.data;
            }).catch(error => {
                if(error.response.status === 500){
                    this.snackbarText = "Internal server error occurred!";
                    this.snackbar = true;
                }
                if(error.response.status === 401){
                   this.snackbar = true
                   this.snackbarText = "You are unauthorized to get donor profile informations!";
                }
            })
        },
    }
}
</script>