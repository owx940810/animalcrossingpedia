<template lang="pug">
  #app
    img#logo(alt="Animal Crossing logo" src="./assets/animal-crossing-logo-700px.png")
    All(:all="all")
    footer
      //- p built by Calvin Ong | #[a(href="https://redd.it/8z14wf") reddit ]| #[a(href="https://calvinong.dev/", target="_blank") calvinong.dev]
      p built by Calvin Ong | #[a(href="https://github.com/owx940810/animalcrossingpedia", target="_blank") Github] | #[a(href="https://calvinong.dev/", target="_blank") calvinong.dev]
      p.
        Credits:
        #[a(href="https://www.ign.com/wikis/animal-crossing-new-horizons/Fish_Guide:_Fish_List,_Sell_Price,_and_Fishing_Tips" target="_blank") IGN]
</template>

<script>
import All from './components/All.vue'
import Favorites from './components/Favorites.vue'

export default {
  name: 'App',
  components: {
    All, Favorites
  },

  data () {
    return {
      all: [],
      favorites: []
    }
  },

  async created () {
    let res = await(await window.fetch('data/fish.json')).json()
    this.all = res
  }
}
</script>

<style lang="sass">
  @import './sass/mixins'
  @import './sass/variables'

  #app

  #logo
    display: block
    width: 300px
    margin: 0 auto
    margin-top: 20px

    +mobile
      width: 150px

  footer
    text-align: center
    padding: 10px 20px
    background-color: $grey-d
    font-size: 0.8em
    color: $white

    a
      text-decoration: none
      color: $yellow

    p + p
      margin-top: 10px

</style>
