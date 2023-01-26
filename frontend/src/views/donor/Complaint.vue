<template>
    <v-container>
        <v-snackbar v-model="snackbar" top timeout="2500">
                        <span>{{snackbarText}}</span>
        </v-snackbar>
        <v-row class="ma-2">
            <v-btn class = "ma-2" @click="loadComplaintHistory">History</v-btn>
            <v-btn class = "ma-2"  @click="crateComplaintForm">Create Complaint</v-btn>
        </v-row>

        <v-flex v-if = "pastClicked">
        <v-data-table :headers = "headers" :items = "tableItems" :items-per-page="15">
            <template v-slot:item = "tableItems" v-bind="tableItems.id">
                <tr>
                    <td>
                          {{tableItems.item.complaintType}}
                      </td>

                      <td>
                             {{tableItems.item.complaintText}}
                        </td>
                        <td>
                             {{tableItems.item.answerText}}
                        </td>  

                    </tr>
            </template>
        </v-data-table>
        </v-flex>
        <v-flex v-if="crateComplaint">
    <form @submit.prevent="submitComplaint">
      <v-select
        label="Complaint Type"
        v-model="complaintType"
        :items="['STAFF', 'CLINIC']"
      ></v-select>
      <v-text-field
        label="Complainee ID"
        v-model="complaineeId"
      ></v-text-field>
      <v-textarea
        label="Complaint Text"
        v-model="complaintText"
      ></v-textarea>
      <v-btn  @click="crateComplaintButton">Submit</v-btn>
    </form>
  </v-flex>



    </v-container>
</template>


<script>

import { getId, getToken } from '../../security/token.js'

export default { 
    name: 'Complaint',
    components: {
    },
    data() {
        return {
            tableItems: [],
            headers: [         
            { text: "Complaint type", value: "complaintType", align: "start", sortable: true, },
            { text: "Complaint text", value: "complaintText",  sortable: true, },
            { text:  "Answer Text", value: "answerText", sortable: true,  },
            ],
            pastClicked: false,
            crateComplaint : false,
            snackbar : false,
            complaineeId: null,
            complaintText:"",
            complaintType:"",
            snackbarText : "",
        }
    },
    mounted() {

    },
    methods: {
        loadComplaintHistory() {
            this.pastClicked = true;
            this.crateComplaint =false;
             this.$http.get('complaint/history/' + getId(),
                {
                    headers : {
                        Authorization: 'Bearer ' + getToken()
                    }
                }
            )
            .then(response => {
                this.tableItems = response.data;
                console.log(response.data);
            }).catch(error => {
                if(error.response.status === 401){
                   this.snackbar = true
                   this.snackbarText = "You are unauthorized to get complaint history!";
                }
            }
          )
        },
        crateComplaintButton(){
            let complaintDTO = {
                    donorId : getId(),
                    complaintText : this.complaintText,
                    complaintType : this.complaintType,
                    complaineeId : this.complaineeId,
                }
                this.$http.post("complaint/create",complaintDTO,
                         {
                         headers : {
                        Authorization: 'Bearer ' + getToken()
                      }
                })
                .then(response=>{
                console.log(response.status)
                console.log('bilo sta')
                console.log(complaintDTO);
                this.snackbarText = "Complaint successfuly created!";
                this.snackbar = true;
                setTimeout(() => { this.$router.push({path: '/donor'})}, 2000);
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
        crateComplaintForm()
        {
            this.crateComplaint =true;
        }

        }
       
    }

</script>
