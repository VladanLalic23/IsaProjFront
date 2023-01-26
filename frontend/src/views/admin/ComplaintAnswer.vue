<template>
    <v-container>
        <v-snackbar v-model="snackbar" top timeout="2500">
                        <span>{{snackbarText}}</span>
        </v-snackbar>
        <v-flex v-if = "pastClicked">
        <v-data-table :headers = "headers" :items = "tableItems" :items-per-page="15">
            <template v-slot:item = "tableItems" v-bind="tableItems.id">
                <tr>
                    <td>
                          {{tableItems.item.donorId}}
                      </td>

                        <td>
                            {{tableItems.item.complaintText}}
                        </td>
                        <td>
                            {{tableItems.item.complaintType}}
                        </td>
                        
                        <td>
                             <v-btn @click="answer(tableItems.item.complaintId)">Answer</v-btn>
                        </td>

                    </tr>
            </template>
        </v-data-table>
        </v-flex>

        <v-flex v-if="answerComplaint">
    <form @submit.prevent="submitComplaint">
      <v-textarea
        label="Answer Text"
        v-model="answerText"
      ></v-textarea>
    </form>
  </v-flex>

    </v-container>
</template>

<script>

import {  getToken } from '../../security/token.js'

export default { 
    name: 'ComplaintAnswer',
    components: {
    },
    data() {
        return {
            tableItems: [],
            headers: [     
            { text: "donorId", value: "donorId", align: "start", sortable: true, filterable: true },
            { text: "Complaint Text", value: "complaintText",  sortable: true, filterable: true },
            { text: "Complaint Type", value: "complaintType", sortable: true, filterable: true },
            ],
            pastClicked: true,
            answerComplaint: true,
            snackbar : false,
            answerText:"",
            snackbarText : "",
            complaintId:"",
        }
    },
    mounted() {
        this.load();

    },
    methods: {
        load(){
              this.$http.get('complaint/all',
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
        answer(complaintId){
            let complaintDTO = {
                    complaintId : complaintId,
                    answerText : this.answerText,
                }
                console.log(complaintDTO);
                this.$http.put("complaint/answer",complaintDTO,
                         {
                         headers : {
                        Authorization: 'Bearer ' + getToken()
                      }
                })
                .then(response=>{
                console.log(response.status)
                console.log(complaintDTO);
                this.snackbarText = "Complaint successfuly answered!";
                this.snackbar = true;
                setTimeout(() => { this.$router.push('/admin').catch(()=>{})}, 2000);

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
            },
        }
}
</script>
