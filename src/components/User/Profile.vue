<template>
  <v-container>
  <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h6>Potvrdite trenutne podatke</h6>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onUpdateUser">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="oldemail"
                label="Trenutna e-mail adresa"
                id="oldemail"
                v-model="oldemail"
                type="email"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="oldpassword"
                label="Trenutna lozinka"
                id="oldpassword"
                v-model="oldpassword"
                type="password"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h6>Novi podaci</h6>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="email"
                label="Nova e-mail adresa"
                id="email"
                v-model="email"
                type="email"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="password"
                label="Nova lozinka"
                id="password"
                v-model="password"
                type="password"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :loading="loading"
                :disabled="!formIsValid"
                type="submit"
                >Ažuriraj podatke
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        oldemail: '',
        oldpassword: '',
        email: '',
        password: ''
      }
    },
    computed: {
      formIsValid () {
        return this.email !== '' &&
          this.password !== '' &&
          this.oldpassword !== '' &&
          this.oldemail !== ''
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value === null && value === undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onUpdateUser () {
        if (!this.formIsValid) {
          return
        }
        const UpdateUserData = {
          email: this.email,
          password: this.password,
          oldpassword: this.oldpassword,
          oldemail: this.oldemail
        }
        this.$store.dispatch('updateUser', UpdateUserData)
        this.$router.push('/profile')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
