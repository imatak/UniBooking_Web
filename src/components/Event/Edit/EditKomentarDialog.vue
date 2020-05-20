<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn  accent slot="activator">
    Komentiraj <v-icon right>comment</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Student će vidjeti komentar koji postavite</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="description"
                label="Komentar"
                id="description"
                multi-line
                v-model="editedDescription"
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editDialog = false">Zatvori</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Spremi</v-btn>
            </v-card-actions>
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
        editedDescription: this.event.komentar
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateKomentar', {
          id: this.event.id,
          description: this.editedDescription
        })
        this.$store.dispatch('loadPastEvents')
        this.$store.dispatch('loadEvents')
        this.$store.dispatch('loadAllEvents')
      }
    }
  }
</script>
