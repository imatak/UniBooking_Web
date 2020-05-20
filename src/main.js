import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditEventDetailsDialog from './components/Event/Edit/EditEventDetailsDialog.vue'
import EditEventDateDialog from './components/Event/Edit/EditEventDateDialog.vue'
import EditEventTimeDialog from './components/Event/Edit/EditEventTimeDialog.vue'
import EditKomentarDialog from './components/Event/Edit/EditKomentarDialog.vue'
import RegisterDialog from './components/Event/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-event-details-dialog', EditEventDetailsDialog)
Vue.component('app-edit-event-date-dialog', EditEventDateDialog)
Vue.component('app-edit-event-time-dialog', EditEventTimeDialog)
Vue.component('app-comment-dialog', EditKomentarDialog)
Vue.component('app-event-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBtNDhiKqX5XXXScjmZcdmGDpZK8ttfdXo',
      authDomain: 'unibooking-7e24d.firebaseapp.com',
      databaseURL: 'https://unibooking-7e24d.firebaseio.com',
      projectId: 'unibooking-7e24d',
      storageBucket: 'unibooking-7e24d.appspot.com',
      messagingSenderId: '358314333586',
      appId: '1:358314333586:web:07177ce182fc454fca1d4b'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadEvents')
    this.$store.dispatch('loadPastEvents')
    this.$store.dispatch('loadAllEvents')
  }
})
