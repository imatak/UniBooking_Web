<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Uredi datum
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Uredi datum događaja</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate"  locale="hr-hr" :allowedDates = lastFiveDays style="width: 100%" actions>
              <template scope="{save, cancel}">
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false">Zatvori</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Spremi</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['event'],
    data () {
      return {
        editDialog: false,
        editableDate: null,
        allowedDates: null,
        lastFiveDays: {
          min: null,
          max: null
        }
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.event.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateEventData', {
          id: this.event.id,
          date: newDate
        })
        this.$store.dispatch('loadPastEvents')
        this.$store.dispatch('loadEvents')
        this.$store.dispatch('loadAllEvents')
      }
    },
    created () {
      this.editableDate = new Date(this.event.date)
    },
    mounted () {
      const date = new Date()
      const d = new Date()
      d.setDate(date.getDate() + 1)
      date.setDate(date.getDate() + 365)
      this.lastFiveDays.min = d
      this.lastFiveDays.max = date
      this.editableDate = d
    }
  }
</script>
