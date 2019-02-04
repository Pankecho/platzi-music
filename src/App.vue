<template lang="pug">
  #app
    pmheader

    notificacion(v-show="showNotification")
      p(slot="body") No se encontraron resultados

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
            pmtrack(:track="t" @select="setSelectedTrack" :class="{ 'is-active' : t.id === selectedTrack}")
    pmfooter
</template>

<script>
import trackService from './services/track'
import pmfooter from '@/components/layout/Footer'
import pmheader from '@/components/layout/Header'
import pmtrack from '@/components/Track'
import loader from '@/components/shared/Loader'
import notificacion from '@/components/shared/Notification'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: '',
      showNotification: false
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
          this.showNotification = res.tracks.total === 0
          this.isLoading = false
          this.tracks = res.tracks.items
        })
    },
    setSelectedTrack(id){
      this.selectedTrack = id
    }
  },
  components: {
    pmfooter,
    pmheader,
    pmtrack,
    loader,
    notificacion
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">
@import "scss/main";
  .results{
    margin-top: 50px;
  }
  .is-active{
    border: 3px #23d160 solid;
  }
</style>
