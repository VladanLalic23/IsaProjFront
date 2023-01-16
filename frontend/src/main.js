import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from "axios";

Vue.prototype.$http = axios
Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  render: h => h(App),
  created() {
    axios.defaults.baseURL = 'http://localhost:7070/';
  }
}).$mount('#app')
