<template>
      <v-container >
        <v-snackbar v-model="snackbar" top timeout="3000">
            <span>{{snackbarText}}</span>
        </v-snackbar>
      <v-row>
    <v-col class="date-picker-container" cols="4">
        <v-date-picker v-model="startDate" flat></v-date-picker>
    </v-col>
    <v-col class="date-picker-container" cols="3">
        <v-time-picker landscape v-model="startTime" format="24hr"></v-time-picker>
    </v-col>
    <v-col class="date-picker-container" cols="3">
        <v-time-picker landscape v-model="endTime" format="24hr"></v-time-picker>
    </v-col>
    <v-col class="date-picker-container" cols="2">
        <label style="display:block; margin-bottom:10px">
          Staff ID:
          <input type="text" v-model="staffId" />
        </label>
    </v-col>
    <v-col class="date-picker-container" cols="2">
        <v-btn @click="addAppointment()">Add Appointment</v-btn>    
    </v-col>
</v-row>

</v-container>
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
          snackbarText : "",
          snackbar : false,  

        
      };
    },
    methods: {
        addAppointment(){
            let startDateString = this.startDate + " " + this.startTime;
            let endDateString = this.startDate + " " + this.endTime;
            let start = new Date(startDateString);
            let end = new Date(endDateString);
            if(this.startDate === null || this.startTime === null || this.endTime === null || this.selected === ""){
                this.snackbar = true
                this.snackbarText = "Fields must not be empty";
            }
            if(end.getTime() < start.getTime()){
                this.snackbar = true
                this.snackbarText = "Start time must be before end time";
            }
            if(this.startDate != null && this.startTime != null && this.endTime != null && this.selected != "" &&
            end.getTime() > start.getTime()){
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
  }
  
  </script>
