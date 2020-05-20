<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn  accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Uredi događaj</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Naslov"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Opis"
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
        editedTitle: this.event.title,
        editedDescription: this.event.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateEventData', {
          id: this.event.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
        this.$store.dispatch('loadPastEvents')
        this.$store.dispatch('loadEvents')
        this.$store.dispatch('loadAllEvents')
      }
    }
  }
</script>
