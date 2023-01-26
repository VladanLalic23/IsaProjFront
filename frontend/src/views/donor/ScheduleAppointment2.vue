<template>
    <v-container>

        <H1>PREDEF</H1>

        <v-data-table :headers = "headersClinic" :items = "clinics" :items-per-page="10">
              <template v-slot:item = "clinics" v-bind="clinics.id">
                  <tr>
                      <td>
                          {{clinics.item.name}}
                      </td>
                      <td>
                           {{clinics.item.averageGrade}}
                      </td>
                      <td>
                           {{clinics.item.city}}
                      </td>
                      <td>
                           {{clinics.item.country}}
                      </td>
                      <td>
                           {{clinics.item.streetName}} {{clinics.item.streetNumber}} / {{clinics.item.flatNumber}}
                      </td>

                      <td>
                             <v-btn @click="loadClinicAppointments(clinics.item.id)">Appointments</v-btn>
                        </td>
                  </tr> 
              </template>                
          </v-data-table>

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
        headersClinic:[
              { text: "Name", value: "name", align: "start", sortable: true, filterable: true },
              { text: "Average grade", value: "averageGrade", sortable: true, filterable: false },
              { text: "City", value: "city", sortable: true, filterable: true },
              { text: "Country", value: "country", sortable: false, filterable: false },
              { text: "Address", value: "Address", sortable: false, filterable: false },
        ],
        snackbarText : "",
        clinics: [],
      };
    },
    mounted() {
        this.loadAllClinics();
    },
    methods: {
        loadAllClinics(){
          this.$http.get('clinic/all',
              {
              })
          .then(response => {
              this.clinics = response.data
          }).catch(error => {
              if(error.response.status === 401){
                 this.snackbarText = "Nemam!";
                 this.snackbar = true;
              }
          }
          )
      },
      allClinics(){
          this.loadAllClinics();
      },
        loadClinicAppointments(clinicId){

            this.$http.get('appointment/clinic/' + clinicId ,
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
                   this.snackbarText = "We couldn't find the staff!";
                }
            }
          )
        },
    }
}
</script>