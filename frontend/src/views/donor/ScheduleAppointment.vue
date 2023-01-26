<template>
    <v-container>
    <v-flex xs11 md9 lg7 xl7 sm9>
    <v-row class="ma-3">
        <v-col>
            <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"        offset-y   max-width="290px" min-width="290px" >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        label="Appointment date:" readonly :value="dateDisp" v-on="on" ></v-text-field>
                </template>
                <v-date-picker locale="en-in" v-model="dateValue" no-title  @input="dateMenu = false" ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col class = "ml-5">
            <v-menu ref="menu" v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="timeValue" label="Appointment time" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="timeMenu" v-model="timeValue" format="24hr" @click:minute="$refs.menu.save(timeValue)"></v-time-picker>
            </v-menu>
        </v-col>
        <v-col>
        <v-btn  class="my-5" small @click="searchForClinics()">Search</v-btn>
        </v-col>
    </v-row>
    </v-flex>

    <v-data-table v-if= !clinicAppointmentsClicked :headers = "headers" :items = "tableItems" :items-per-page="10">
                <template v-slot:item = "tableItems" v-bind="tableItems.id">
                    <tr>
                        <td>
                            {{tableItems.item.clinicName}}
                        </td>
                        <td>
                             {{tableItems.item.clinicAverageGrade}}
                        </td>
                        <td>
                             {{tableItems.item.clinicAddress}} 
                        </td>
                        <td>
                            <v-btn @click="loadClinicAppointments(tableItems.item.clinicId)">Find all Appointments</v-btn> 
                        </td>
                    </tr> 
                </template>                
    </v-data-table>   

     <v-snackbar v-model="snackbar" top timeout="2500">
    <span>{{snackbarText}}</span>
    </v-snackbar>

    <v-data-table v-if= clinicAppointmentsClicked :headers = "appointmentHeaders" :items = "appointments" :items-per-page="10">
        <template v-slot:item = "appointments" v-bind="appointments.id">
            <tr>
                 <td>
                     {{new Date(appointments.item.timeInterval.startTime).toLocaleString()}}
                </td>
                <td>
                    {{new Date(appointments.item.timeInterval.endTime).toLocaleString()}}
                </td>
                <td>
                    {{appointments.item.examinerAverageGrade}}
                </td>
                <td>
                    {{appointments.item.type}}
                </td>
                <td>
                    {{appointments.item.price}}
                </td>
                <td>
                    <v-btn  @click="scheduleAppointment(appointments.item.id)">Schedule</v-btn>
                </td>
            </tr>
        </template>                
    </v-data-table>   
    </v-container>
</template>

<script>

import {  getId,getToken } from '../../security/token.js'

export default {
    name: 'scheduleAppointment',
    components: {
    },
    data() {
      return {
        dateMenu: false,
        dateValue: null,
        timeValue: null,
        timeMenu: false,
        clinicAppointmentsClicked : false,
        tableItems : [],
        time : false,
        headers: [
                { text: "Name", value: "name", align: "start", sortable: false },
                { text: "Average grade", value: "averageGrade", sortable: true },
                { text: "Address", value: "Address", sortable: false },
        ],
        appointments: [],
        appointmentHeaders: [         
            { text: "Start time", align: "start", value: "appointmentStartTime", sortable: false },
            { text: "End time", value: "appointmentEndTime", sortable: false },
        ],
        snackbar: false,
        snackbarText : "",
      };
    },
    computed: {
      dateDisp() {
        return this.dateValue;
      },
    },
    mounted() {

    },
    methods: {
        loadClinicAppointments(clinicId){
            this.clinicAppointmentsClicked = true;
            
            let date = new Date(this.dateValue + " " + this.timeValue + ":00")
            let appointmentSearchDTO = {
                appointmentTime :  date,
                clinicId : clinicId,
                donorId: getId()
            }
            this.$http.post('appointment/clinic-date/',
            appointmentSearchDTO,
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                this.appointments = response.data
            }).catch(error => {
                if(error.response.status === 400){
                   this.snackbar = true
                   this.snackbarText = "We couldn't find the clinic!";
                }
            }
          )
        },
        searchForClinics(){
            this.tableItems = [];
            let date = new Date(this.dateValue + " " + this.timeValue + ":00")
            let appointmentSearchDTO = {
                appointmentTime :  date,
                donorId : getId()
            }
            this.$http.post('appointment/available-clinic',
            appointmentSearchDTO,
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                this.tableItems = response.data;
            })
        },
        scheduleAppointment (appointmentId) {
            let scheduleAppointmentDTO = {
                donorId : getId(),
                appointmentId : appointmentId
            }
            this.$http.put('appointment/schedule/',
                scheduleAppointmentDTO,
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            ).then(response => {
                    console.log(response)
                    this.snackbarText = "You have successfully scheduled your appointment!";
                    this.snackbar = true;
                    setTimeout(() => { this.$router.push('/donor/appointments/').catch(()=>{})}, 2000);
            })
        
          
        },
    }
}
</script>