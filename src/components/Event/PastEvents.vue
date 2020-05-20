<template>
  <v-container>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <h5><v-icon right>search</v-icon> <input type="text" v-model="search" placeholder="Pretraži rezervacije" />
          <v-icon right>filter_list</v-icon> <select v-model="selected" @change="filteredRezervacije()">
            <option disabled value="">Filtriranje pretaživanja</option>
            <option>Fakultet</option>
            <option>Datum</option>
            <option>Status</option>
            <option>Razlog</option>
            <option>E-mail studenta</option>
          </select></h5>
      </v-flex>
    </v-layout>
  </v-container>
    <v-layout row wrap v-for="event in filteredRezervacije" :key="event.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0"><v-icon large class="white--text">account_circle</v-icon>[{{ event.fakultet }}] {{ event.emailUsera }} </h5>
                    <h5 class="white--text mb-0"><v-icon large class="white--text">schedule</v-icon> {{ event.datum }} - {{ event.termin }}</h5>
                    <h5 class="white--text mb-0"><v-icon large class="white--text">live_help</v-icon> {{ event.razlog }}</h5>
                  </div>
                </v-card-title>
                <v-card-title>
                <div>
                <h5 class="white--text mb-0"><v-icon large class="white--text">event_note</v-icon> {{ event.status }} - Prošlo</h5>
                <h5 class="white--text mb-0"><v-icon large class="white--text">contact_mail</v-icon> {{ event.uredio }} </h5>
                <h5 class="white--text mb-0"><v-icon large class="white--text">comment</v-icon>Komentar: {{ event.komentar }} </h5>
                </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        selected: ''
      }
    },
    computed: {
      events () {
        return this.$store.getters.loadedPastEvents
      },
      filteredRezervacije: function () {
        return this.events.filter((event) => {
          if (this.selected === 'Fakultet') {
            return event.fakultet.match(this.search)
          } else if (this.selected === 'Razlog') {
            return event.razlog.match(this.search)
          } else if (this.selected === 'Datum') {
            return event.datum.match(this.search)
          } else if (this.selected === 'Status') {
            return event.status.match(this.search)
          } else if (this.selected === 'E-mail studenta') {
            return event.emailUsera.match(this.search)
          } else {
            return event.datum.match(this.search)
          }
        })
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onOdobri (eventid) {
        this.$store.dispatch('odobriTermin', {
          id: eventid
        })
      },
      onOtkazi (eventid) {
        this.$store.dispatch('otkaziTermin', {
          id: eventid
        })
      }
    }
  }
</script>
