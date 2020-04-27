<template lang="pug">
  #app
    FilterComponent(:filterProperties="filterProperties", :selectedType="selectedType")

    #alert
      p bug list coming soon*

    img#logo(alt="Animal Crossing logo" src="./assets/animal-crossing-logo-700px.png")

    #type-toggle
      .toggle(:data-type="selectedType", @click="toggleType")
        .type.fish Fish
        .type.bug Bug

    All(:fishes="fishes", :bugs="bugs" @showOverlay="showOverlay", :filterProperties="filterProperties", :selectedType="selectedType")

    footer
      p built by Calvin Ong
      p.
        Credits:
        #[a(href="https://www.ign.com/wikis/animal-crossing-new-horizons/Fish_Guide:_Fish_List,_Sell_Price,_and_Fishing_Tips" target="_blank") IGN] |
        #[a(href="https://www.polygon.com/animal-crossing-new-horizons-switch-acnh-guide/2020/3/23/21190775/fish-locations-times-month-day-list-critterpedia" target="_blank") Polygon] |
        #[a(href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)" target="_blank") Fandom Fish List] |
        #[a(href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)" target="_blank") Fandom Bug List] |
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

    toggleType () {
      if (this.selectedType === "fishes") {
        this.selectedType = "bugs"
      } else if (this.selectedType === "bugs") {
        this.selectedType = "fishes"
      }
      window.localStorage.setItem('type', this.selectedType)
    }
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
    margin-top: 20px
    margin-bottom: 100px

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
      display: grid
      grid-template-columns: 100px 100px
      grid-template-rows: 50px
      cursor: pointer
      place-items: center center
      background-color: #ECF0F1
      border-radius: 7px

      +mobile
        grid-template-columns: 80px 80px
        grid-template-rows: 40px

      &[data-type="fishes"]
        &::before
          transform: translateX(0)
          background-color: #AED6F1
        .fish
          color: black

      &[data-type="bugs"]
        &::before
          transform: translateX(100px)
          background-color: #76D7C4

          +mobile
            transform: translateX(80px)
        .bug
          color: black

      &::before
        content: ""
        position: absolute
        width: 116px
        height: 58px
        border-radius: 7px
        background-color: white
        top: -4px
        left: -8px
        z-index: 0
        transition: transform $speed-normal ease-out, background-color $speed-fast ease-out

        +mobile
          width: 88px
          height: 48px
          top: -4px
          left: -4px

      .type
        background-color: transparent
        z-index: 1
        font-family: "Share Tech Mono", monospace
        font-size: 24px
        transition: all $speed-fast
        color: $grey

        +mobile
          font-size: 18px

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
