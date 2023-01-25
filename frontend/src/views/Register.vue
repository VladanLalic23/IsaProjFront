<template>
    <v-container>
        <v-layout class="my-10" justify-center>          
            <v-flex xs8 md6 lg4 xl4 sm6>
            <v-card  class="pa-3">
                <v-card-title>
                    <h3>Register</h3>
                </v-card-title>
                <v-snackbar v-model="snackbar" top timeout="3500">
                     <span>{{snackbarText}}</span>
                     </v-snackbar>
                <v-form v-model="form.isFormValid">
                    <v-text-field label ="Email" v-model="form.email" :rules="rules.emailRules"></v-text-field>
                    <v-text-field type="password" label ="Password" v-model="form.password" :rules="rules.passwordRules"></v-text-field>
                    <v-text-field type="password" label ="Repeat password" v-model="form.passwordRepeat"  :rules="rules.passwordRepeatRules"></v-text-field>
                    <v-text-field label ="Name" v-model="form.name" :rules="rules.nameRules"></v-text-field>
                    <v-text-field label ="Surname" v-model="form.surname" :rules="rules.surnameRules"></v-text-field>
                    <v-text-field label ="JMBG" v-model="form.jmbg" :rules="rules.jmbgRules"></v-text-field>

                    <v-row>
                        <v-radio-group v-model="form.gender" :rules="[gender => !!gender || 'You must choose a gender!']" required>
                        <v-radio label="Male" value="MALE"/>
                        <v-radio label="Female" value="FEMALE"/>
                        </v-radio-group>
                    </v-row>
                    <v-text-field label ="Street name" v-model="form.streetName" :rules="rules.streetNameRules"></v-text-field>
                    <v-text-field label ="Street number" v-model="form.streetNumber" :rules="rules.streetNumberRules"></v-text-field>
                    <v-text-field label ="Flat number" v-model="form.flatNumber" :rules="rules.flatNumberRules"></v-text-field>
                    <v-text-field label ="City" v-model="form.city" :rules="rules.cityRules"></v-text-field>     
                    <v-text-field label ="Postal code" v-model="form.postalCode" :rules="rules.postalCodeRules"></v-text-field> 
                    <v-text-field label ="Country" v-model="form.country" :rules="rules.countryRules"></v-text-field>  
                    <v-text-field label ="Phone number" v-model="form.phoneNumber" :rules="rules.phoneNumberRules"></v-text-field>
                    <v-text-field label="Profession" v-model="form.profession" :rules="rules.professionRules"></v-text-field>
                    <v-text-field label ="Information" v-model="form.information" :rules="rules.informationRules"></v-text-field>

       
                    <v-btn  allign-right :disabled="!form.isFormValid" :rules="rules.passwordRepeatRules" @click="submit">Register</v-btn>
                    <v-spacer></v-spacer>
                </v-form>
            </v-card>
         </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Register',
    components: {
        
    },
    data(){
        return{
            form:{
                email:"",
                password:"",
                passwordRepeat:"",
                name:"",
                surname:"",
                gender: "",
                streetName:"",
                streetNumber:"",
                flatNumber:"",
                city:"",
                postalCode:"",
                country:"",
                phoneNumber:"",
                jmbg:"",
                profession:"",
                information:"",
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
                passwordRepeatRules: [
                    passwordRepeat => this.form.password === passwordRepeat || "Passwords do not match!",
                ],
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
                jmbgRules:[
                    jmbg=> !!jmbg|| 'Jmbg is required!',
                    jmbg=>/^[0-9]+$/.test(jmbg) || 'Jbmg must contain only numbers!'
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
            snackbarText: ""
        }
    },
    methods: {
        submit(){
            let registrationDTO = {
                email: this.form.email,
                password: this.form.password,
                name: this.form.name,
                surname: this.form.surname,
                profession: this.form.profession,
                info: this.form.information,
                jmbg:this.form.jmbg,
                gender: this.form.gender.toUpperCase(),
                streetName: this.form.streetName,
                streetNumber: this.form.streetNumber,
                flatNumber: this.form.flatNumber,
                city: this.form.city,
                postalCode: this.form.postalCode,
                country: this.form.country,
                phone: this.form.phoneNumber
               

            }
            this.$http.post('/auth/register', registrationDTO)
            .then(response=>{
                console.log(response.data);
                this.snackbarText = "Your account has been successfuly created!";
                this.snackbar = true;
                setTimeout(() => { this.$router.push({path: '/'})}, 2000);
            }).catch(error => {
                if(error.response.status === 500){
                    this.snackbarText = "Internal server error occurred!";
                    this.snackbar = true;
                }else if(error.response.status === 409){
                    this.snackbarText = "User with same email address already exists!";
                    this.snackbar = true;
                }
            })
        }
    }
}
</script>
