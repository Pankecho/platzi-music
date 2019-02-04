<template lang="pug">
  #app
    pmheader
    section.section
      nav.nav.has-shadow
        .container
          input.input.is-large(type="text" placeholder="Buscar canciones" v-model="searchQuery")
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;

      .container
        p
          small {{ seachMessage }}

      .container
        .columns
          .column(v-for="t in tracks") {{ t.name }}
    pmfooter
</template>

<script>
import trackService from './services/track'
import pmfooter from '@/components/layout/Footer'
import pmheader from '@/components/layout/Header'
import pmtrack from '@/components/Track'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: []
    }
  },
  computed: {
    seachMessage(){
      return `Se encontraron ${this.tracks.length} resultados`
    }
  },
  methods: {
    search(){
      console.log(this.searchQuery)
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
        })
    }
  },
  components: {
    pmfooter,
    pmheader,
    pmtrack
  }
}
</script>

<style lang="scss">
@import "scss/main";

</style>
