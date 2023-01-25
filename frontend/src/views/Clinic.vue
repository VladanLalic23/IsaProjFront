<template>
  <v-container class="green lighten-5">    
      <v-snackbar v-model="snackbar" top timeout="3000">
              <span>{{snackbarText}}</span>
      </v-snackbar> 
          <v-row class="ma-3" >
              <v-btn @click="allClinics" class = "mr-3">All Clinics</v-btn> 
          </v-row>
          <v-flex xs8 md6 lg4 xl4 sm6>
          <v-text-field class= "ma-3"
              v-model="search"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          </v-flex>
          <v-flex xs10 md8 lg6 xl6 sm8>
          <v-row class = "ma-3">
              <v-btn class= "ma-3" x-small @click="resetFilters()">Reset filters</v-btn>  
          </v-row>
          </v-flex>
          <v-data-table :headers = "headers" :items = "clinics" :items-per-page="10" :search="search">
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

                  </tr> 
              </template>                
          </v-data-table>    
  </v-container>
</template>

<script>
export default {
  name:'Clinics',
  components: {
  },
  data(){
      return{
          clinics: [],
          snackbar: false,
          snackbarText : '',
          filteredClinics: [],
          headers: [
              { text: "Name", value: "name", align: "start", sortable: true, filterable: true },
              { text: "Average grade", value: "averageGrade", sortable: true, filterable: false },
              { text: "City", value: "city", sortable: true, filterable: true },
              { text: "Country", value: "country", sortable: false, filterable: false },
              { text: "Address", value: "Address", sortable: false, filterable: false },
          ],
          search: '',
          clinicGrade: 0,           
      }
  },
  mounted(){
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
      resetFilters(){
          this.loadAllClinics();
          this.search = "";
          this.clinicGrade = 1;
      },

  },
}
</script>