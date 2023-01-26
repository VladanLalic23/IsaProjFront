<template>
    <v-container>
        <v-snackbar v-model="snackbar" top timeout="2500">
                        <span>{{snackbarText}}</span>
        </v-snackbar>
        <v-row class="ma-2">
            <v-btn class = "ma-2" @click="loadClinicAppointment">History</v-btn>
            <v-btn class = "ma-2"  @click="loadScheduledAppointments">Scheduled appointments</v-btn>

            <v-spacer/>
                    <v-btn class = "ma-2"  @click="scheduleAppointment">Schedule appointment</v-btn>
                    <v-btn class = "ma-2"  @click="schedulePredefAppointment">Schedule predef appointment</v-btn>
        </v-row>

        <v-flex v-if = "pastClicked">
        <v-data-table :headers = "headers" :items = "tableItems" :items-per-page="15">
            <template v-slot:item = "tableItems" v-bind="tableItems.id">
                <tr>
                    <td>
                          {{tableItems.item.clinicName}}
                      </td>

                        <td>
                             {{new Date(tableItems.item.startDate).toLocaleString()}}
                        </td>
                        <td>
                             {{new Date(tableItems.item.endDate).toLocaleString()}}
                        </td>

                    </tr>
            </template>
        </v-data-table>
        </v-flex>
    
        <v-flex v-if = "scheduledClicked">
        <v-data-table :headers = "scheduledHeaders" :items = "scheduledTableItems" :items-per-page="15">
            <template v-slot:item = "scheduledTableItems" v-bind="scheduledTableItems.id">
                <tr>
                    <td>
                          {{scheduledTableItems.item.clinicName}}
                      </td>
                      <td>
                        {{new Date(scheduledTableItems.item.startDate).toLocaleString()}}
                      </td>
                      <td>
                        {{new Date(scheduledTableItems.item.endDate).toLocaleString()}}
                      </td>
                        <td>
                             <v-btn @click="cancelAppointment(scheduledTableItems.item.appointmentId)">Cancel</v-btn>
                        </td>
                    </tr>
            </template>
        </v-data-table>
        </v-flex>
    </v-container>
</template>

<script>

import { getId, getToken } from '../../security/token.js'

export default { 
    name: 'DonorAppointments',
    components: {
    },
    data() {
        return {
            tableItems: [],
            scheduledTableItems: [],
            headers: [         
            { text: "Clinic name", value: "clinicName", align: "start", sortable: true, filterable: true },
            { text: "Start time", value: "startDate",  sortable: true, filterable: true },
            { text: "End time", value: "endDate", sortable: true, filterable: true },
            ],
            scheduledHeaders: [         
            { text: "Clinic name", value: "clinicName", align: "start", sortable: true, filterable: true },
            { text: "Start time", value: "startDate",  sortable: true, filterable: true },
            { text: "End time", value: "endDate", sortable: true, filterable: true },
            ],
            pastClicked: false,
            scheduledClicked : false,
            snackbar : false,
            snackbarText : "",
        }
    },
    mounted() {

    },
    methods: {
        loadScheduledAppointments() {
            this.pastClicked = false;
            this.scheduledClicked = true;
             this.$http.get('appointment/scheduled/' + getId(),
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                this.scheduledTableItems = response.data;
            }).catch(error => {
                if(error.response.status === 401){
                   this.snackbar = true
                   this.snackbarText = "You are unauthorized to get scheduled donor appointments!";
                }
            }
          )
        },
        loadClinicAppointment(){
              this.pastClicked = true;
              this.scheduledClicked = false,
              this.$http.get('appointment/past/' + getId(),
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                this.tableItems = response.data;
            }).catch(error => {
                if(error.response.status === 401){
                   this.snackbar = true
                   this.snackbarText = "You are unauthorized to get past donor appointments!";
                }
            }
          )
        },
        scheduleAppointment() {
            this.$router.push('/donor/schedule-appointment').catch(()=>{})
        },
        schedulePredefAppointment() {
            this.$router.push('/donor/schedule-appointment2/').catch(()=>{})
        },
        cancelAppointment (appointmentId) {
            let appointmentCancellationDTO = {
                donorId : getId(),
                appointmentId : appointmentId
            }
            this.$http.put('appointment/cancel',
                appointmentCancellationDTO,
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                    console.log(appointmentId)
                    console.log(response)
                    this.snackbarText = "You have successfully canceled your appointment!";
                    this.snackbar = true;
                    setTimeout(() => { this.$router.go(this.$router.currentRoute)}, 1000);
            }).catch(error => {
                if(error.response.status === 400){
                   this.snackbarText = "You can't cancel your appointment!";
                   this.snackbar = true;
                }
            }
          )
        },
       
    }
}
</script>
