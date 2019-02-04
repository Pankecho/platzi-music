<template lang="pug">
  #app
    pmheader
    loader(v-show="this.isLoading")
    section.section(v-show="!this.isLoading")
      nav.nav.has-shadow
        .container
          input.input.is-large(type="text" placeholder="Buscar canciones" v-model="searchQuery")
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;

      .container
        p
          small {{ seachMessage }}

      .container
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pmtrack(:track="t")
    pmfooter
</template>

<script>
import trackService from './services/track'
import pmfooter from '@/components/layout/Footer'
import pmheader from '@/components/layout/Header'
import pmtrack from '@/components/Track'
import loader from '@/components/shared/Loader'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false
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
      this.isLoading = true
      trackService.search(this.searchQuery)
        .then(res => {
          this.isLoading = false
          this.tracks = res.tracks.items
        })
    }
  },
  components: {
    pmfooter,
    pmheader,
    pmtrack,
    loader
  }
}
</script>

<style lang="scss">
@import "scss/main";
</style>
