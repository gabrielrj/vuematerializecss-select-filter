import Vue from 'vue'
import App from './App.vue'

//Import Materialize Style css
//import 'materialize-css/dist/css/materialize.min.css'
//Import MaterializeCss Icons
//import 'material-design-icons/iconfont/material-icons.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
