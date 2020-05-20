<template>
  <v-container>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <img src="./logo.png">
      </v-flex>
  </v-layout>
  <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <h3 style="color:gray;"><b>Aplikacija za rezervaciju u studentskim referadama</b></h3>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      events () {
        return this.$store.getters.featuredEvents
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadEvent (id) {
        this.$router.push('/events/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
