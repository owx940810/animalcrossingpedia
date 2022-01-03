<template lang="pug">
#app
  FilterComponent(:filterProperties="filterProperties", :selectedType="selectedType")

  //- #alert
  //-   p bug list coming soon*

  img#logo(alt="Animal Crossing logo" src="./assets/animal-crossing-logo-700px.png")

  #type-toggle
    .toggle
      button.default.fishes(@click="selectCreatureType('fishes')") Fish
      button.default.bugs(@click="selectCreatureType('bugs')") Bug
      button.default.deep-sea-creatures(@click="selectCreatureType('deepSeaCreatures')") Deep Sea Creatures

  All(:fishes="fishes", :bugs="bugs", :deepSeaCreatures="deepSeaCreatures", @showOverlay="showOverlay", :filterProperties="filterProperties", :selectedType="selectedType")

  footer
    a(href="https://calvinong.dev") Designed &amp; Built by Calvin Ong
    br
    a.github-link(href="https://github.com/owx940810/animalcrossingpedia")
      img(src="./assets/feather/github.svg")
      span Github

    p.credits.
      Credits:
      #[a(href="https://www.ign.com/wikis/animal-crossing-new-horizons/Fish_Guide:_Fish_List,_Sell_Price,_and_Fishing_Tips" target="_blank") IGN] |
      #[a(href="https://www.polygon.com/animal-crossing-new-horizons-switch-acnh-guide/2020/3/23/21190775/fish-locations-times-month-day-list-critterpedia" target="_blank") Polygon] |
      #[a(href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)" target="_blank") Fandom Fish List] |
      #[a(href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)" target="_blank") Fandom Bug List] |
      #[a(href="https://animalcrossing.fandom.com/wiki/Deep-sea_creatures_(New_Horizons)" target="_blank") Fandom Deep Sea Creatures List]
</template>

<script>
import All from './components/All.vue'
import Favorites from './components/Favorites.vue'
import FilterComponent from './components/FilterComponent.vue'

export default {
  name: 'App',
  components: {
    All, Favorites, FilterComponent
  },

  data () {
    return {
      all: [],
      fishes: [],
      bugs: [],
      deepSeaCreatures: [],
      favorites: [],
      overlayState: false,
      selectedItem: null,
      filterProperties: {
        hemisphere: [],
        months: [],
        location: []
      },
      selectedType: "fishes"
    }
  },

  async created () {
    this.getType()
    await this.getFishList()
    await this.getBugList()
    await this.getDeepSeaCreaturesList()
  },

  methods: {
    async getFishList () {
      let res = await(await window.fetch('data/fish.json')).json()

      res.map(item => {
        item.north = item.north.split(',').map(month => month.trim())
        item.south = item.south.split(',').map(month => month.trim())
        return item
      })
      this.fishes = res
    },

    async getBugList () {
      let res = await(await window.fetch('data/bug.json')).json()

      res.map(item => {
        item.north = item.north.split(',').map(month => month.trim())
        item.south = item.south.split(',').map(month => month.trim())
        return item
      })
      this.bugs = res
    },

    async getDeepSeaCreaturesList () {
      let res = await(await window.fetch('data/deep-sea-creatures.json')).json()

      res.map(item => {
        item.north = item.north.split(',').map(month => month.trim())
        item.south = item.south.split(',').map(month => month.trim())
        return item
      })
      this.deepSeaCreatures = res
    },

    getType () {
      if (!window.localStorage.getItem('type')) {
        return window.localStorage.setItem('type', this.selectedType)
      }
      this.selectedType = window.localStorage.getItem('type')
    },

    showOverlay (item) {
      this.overlayState = true
      this.selectedItem = item
    },

    closeOverlay () {
      this.overlayState = false
      this.selectedItem = null
    },

    selectCreatureType (type) {
      this.selectedType = type
      window.localStorage.setItem('type', this.selectedType)

      gtag('event', 'change type', {
        'event_category': 'select creature type',
        'event_label': this.selectedType
      })
    },
  }
}
</script>

<style lang="sass">
  @import './sass/mixins'
  @import './sass/variables'

  #logo
    display: block
    width: 300px
    margin: 0 auto
    // margin-top: 20px //with alert
    margin-bottom: 100px
    margin-top: calc(20px + 42px) //no alert

    +mobile
      width: 150px
      margin-bottom: 60px

  #alert
    color: darkgrey
    background-color: #E6E6E6
    font-size: 10px
    padding: 5px
    text-align: center
    font-style: italic
    margin-top: 42px

  #type-toggle
    position: relative
    display: flex
    flex-flow: row nowrap
    justify-content: center
    align-items: center

    .toggle
      position: relative
      display: flex
      flex-flow: row nowrap
      cursor: pointer
      border-radius: 7px

      +mobile
        flex-flow: row wrap

      button
        white-space: pre
        margin: 12px
        color: $white

      .fishes
          background-color: $pastel-blue

      .bugs
          background-color: $tree-green

      .deep-sea-creatures
          background-color: $storm-blue

  footer
    text-align: center
    padding: 10px 20px
    font-size: 12px
    color: $black

    a
      text-decoration: none

      &:hover
        color: $yellow

    .github-link
      display: block
      margin: 10px 0

      img
        display: inline-block
        vertical-align: middle

      span
        display: inline-block
        vertical-align: middle
        margin-left: 6px

    p + p
      margin-top: 10px

    .credits
      margin-top: 24px
      padding-bottom: 12px

</style>
