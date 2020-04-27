<template lang="pug">
  #all
    #search-wrapper
      input(type="text", placeholder="eg: shark", v-model="searcheditem")

    #sort
      button.default(@click="changeSort") SORT BY#[br]#[hr]{{ sort.type[sort.index].toLocaleUpperCase() }}

    .all
      item(v-for="(item, index) in selecteditems", :item="item", :key="index", :sortIndex="sort.index", :selectedType="selectedType")

</template>

<script>
  import Item from './Item.vue'
  import _ from 'lodash'

  export default {
    name: 'All',

    props: ['fishes', 'bugs', 'filterProperties', 'selectedType'],

    components: {
      Item
    },

    data () {
      return {
        searcheditem: '',
        sort: {
          type: ['name', 'price', 'location', 'time', 'shadow'],
          index: 0
        },
      }
    },

    watch: {
      selectedType (val) {
        if (this.selectedType === "bugs" && this.sort.index === 4) {
          this.changeSort()
        }
      }
    },

    computed: {
      filteredItems () {
        let arr = []

        if (this.selectedType === "fishes") {
          arr = JSON.parse(JSON.stringify(this.fishes))
        } else if (this.selectedType === "bugs") {
          arr = JSON.parse(JSON.stringify(this.bugs))
        }

        if(this.filterProperties.months.length > 0) {
          arr = arr.filter(item => {
            if (this.filterProperties.hemisphere.length === 1) {
              if (this.filterProperties.hemisphere.indexOf('north') >= 0) {
                return this.filterProperties.months.filter(filteredMonth => {
                  return item.north.indexOf(filteredMonth) >= 0 || item.north[0] === 'All Months'
                }).length > this.filterProperties.months.length - 1
              }
              if (this.filterProperties.hemisphere.indexOf('south') >= 0) {
                return this.filterProperties.months.filter(filteredMonth => {
                  return item.south.indexOf(filteredMonth) >= 0
                }).length > this.filterProperties.months.length - 1
              }
            } else {
              return this.filterProperties.months.filter(filteredMonth => {
                let north = item.north.indexOf(filteredMonth) >= 0 || item.north[0] === 'All Months'
                let south = item.south.indexOf(filteredMonth) >= 0 || item.south[0] === 'All Months'

                if (this.filterProperties.hemisphere.length === 2) {
                  return north && south
                } else {
                  return north || south
                }
              }).length > this.filterProperties.months.length - 1
            }
          })
        }

        if (this.filterProperties.location.length > 0) {
          arr = arr.filter(item => {
            return this.filterProperties.location.filter(filteredLocation => {
              return item.location.indexOf(filteredLocation) >= 0
            }).length > 0
          })
        }

        return arr
      },

      selecteditems () {
        let selected = []

        let arr = this.filteredItems

        if (this.searcheditem) {
          selected = arr.filter(item => {
            if (item.name.toLowerCase().indexOf(this.searcheditem.toLowerCase()) >= 0) {
              return item
            }
          })
        } else {
          selected = arr
        }

        let sort = this.sort.type[this.sort.index]
        let direction = 'asc'
        if (sort === 'price' || sort === "shadow") {
          direction = 'desc'
        }
        return _.orderBy(selected, [sort], [direction])
      }
    },

    mounted () {
      this.getSortType()
    },

    methods: {
      getSortType () {
        if (!window.localStorage.getItem('sort')) {
          return window.localStorage.setItem('sort', this.sort.index)
        }
        this.sort.index = parseInt(window.localStorage.getItem('sort'))
      },

      changeSort () {
        this.sort.index++

        let maxLength = this.sort.type.length

        if (this.selectedType === 'bugs') {
          maxLength = this.sort.type.length - 1
        }
        if (this.sort.index >= maxLength) {
          this.sort.index = 0
        }

        gtag('event', 'sort', {
          'value': this.sort.type[this.sort.index]
        })

        window.localStorage.setItem('sort', this.sort.index)
      },

      // selectCard (item) {
      //   this.$emit("showOverlay", item)
      // },
    }
  }
</script>

<style lang="sass">
  @import '../sass/mixins'
  @import '../sass/variables'

  #all
    margin-top: 50px
    padding-bottom: 50px

    #search-wrapper
      position: relative
      display: block
      margin: 40px auto 0 auto
      width: 300px

      &::after
        content: ""
        display: block
        position: absolute
        width: 20px
        height: 20px
        background-size: contain
        right: 10px
        top: 50%
        transform: translateY(-50%)
        background-image: url("../assets/feather/search.svg")
        opacity: 0.8

      input
        background-color: $white
        border-radius: 20px
        padding: 7px 15px
        border: 1px solid $line
        width: 100%

    h1
      text-align: center

    #sort
      margin-top: 30px
      padding: 0 50px
      display: flex
      flex-direction: row-reverse

      +mobile
        padding: 0 20px

    .all
      margin-top: 30px
      padding: 0 50px
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
      grid-gap: 25px

      +mobile
        padding: 0 20px
        display: grid
        grid-template-columns: repeat(2, minmax(60px, 1fr))
</style>
