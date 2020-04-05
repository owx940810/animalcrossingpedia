<template lang="pug">
  #app
    #alert
      p bug list coming soon*
    img#logo(alt="Animal Crossing logo" src="./assets/animal-crossing-logo-700px.png")
    All(:all="all")
    footer
      //- p built by Calvin Ong | #[a(href="https://redd.it/8z14wf") reddit ]| #[a(href="https://calvinong.dev/", target="_blank") calvinong.dev]
      p built by #[a(href="https://calvinong.dev/", target="_blank") Calvin Ong] | #[a(href="https://github.com/owx940810/animalcrossingpedia", target="_blank") Github]
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

    res.map(item => {
      item.north = item.north.split(',').map(month => month.trim())
      item.south = item.south.split(',').map(month => month.trim())
      return item
    })
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
  #alert
    color: darkgrey
    background-color: #E6E6E6
    font-size: 10px
    padding: 5px
    text-align: center
    font-style: italic

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
