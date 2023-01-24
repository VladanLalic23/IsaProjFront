<template>
    <v-container>

        <H1>PREDEF</H1>

    <v-data-table :headers = "headers" :items = "appointments" :items-per-page="10">
        <template v-slot:item = "appointments" v-bind="appointments.id">
            <tr>
                <td>
                        {{new Date(appointments.item.timeInterval.startTime).toLocaleString()}}
                      </td>
                      <td>
                        {{new Date(appointments.item.timeInterval.endTime).toLocaleString()}}
                      </td>
                <td>
                    {{appointments.item.staff}}
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
        headers: [
            { text: "Start time",align: "start", value: "startTime",  sortable: true, filterable: true },
            { text: "End time", value: "endDate", sortable: true, filterable: true },
        ],
        appointments: [],
        snackbar: false,
        snackbarText : "",
      };
    },
    mounted() {
        this.loadClinicAppointments();
    },
    methods: {
        loadClinicAppointments(){
            this.$http.get('appointment/clinic/1',
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
            }).catch(error => {
                if(error.response.status === 400){
                   this.snackbar = true
                   this.snackbarText = "We couldn't find the employee!";
                }
            }
          )
        },
    }
}
</script>