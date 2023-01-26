<template>
    <div style="display: block; justify-content: center; align-items: center; background-color: #ffcccb; height: 100vh">
      <form @submit.prevent="addAppointment" style="background-color: white; padding: 20px;">
        <label style="display:block; margin-bottom:10px">
          Date:
          <v-date-picker v-model="startDate" flat></v-date-picker>
        </label>
        <label style="display:block; margin-bottom:10px">
          Start Time:
          <v-time-picker landscape v-model="startTime" format="24hr"></v-time-picker>
        </label>
        <label style="display:block; margin-bottom:10px">
          End Time:
          <v-time-picker landscape v-model="endTime" format="24hr"></v-time-picker>
        </label>
        <label style="display:block; margin-bottom:10px">
          Staff ID:
          <input type="text" v-model="staffId" />
        </label>
        <v-btn @click="addAppointment()">Add Appointment</v-btn>    
      </form>
    
    </div>
  </template>
  
  
  
<script>
import {  getToken } from '../../security/token.js';
export default {
    data() {
      return {
          startDate: "",
          startTime: "",
          endTime: "",
          staffId: "",
        
      };
    },
    methods: {
        addAppointment(){
            let startDateString = this.startDate + " " + this.startTime;
            let endDateString = this.startDate + " " + this.endTime;
            let start = new Date(startDateString);
            let end = new Date(endDateString);
            console.log(start);
            let appointmentDTO = {
                    staffId : this.staffId,
                    startDate : start,
                    endDate : end,
                }
                this.$http.post("appointment/create",appointmentDTO,
                {
                headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                })
                .then(response => {     
                    this.snackbar = true
                    this.snackbarText = "Appointment created!";
                    console.log(response.status)
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        this.snackbar = true
                        this.snackbarText = "We couldn't save appointment!";
                    }else if(error.response.status === 401){
                        this.snackbar = true
                        this.snackbarText = "Unauthorized!";
                    }else{
                        this.snackbar = true
                        this.snackbarText = "Server error occured!";
                    }
                });
            }
            
        },

    }
  
  </script>
