<template lang="pug">
  #all
    //- .favorites-wrapper(v-if="favorites.length > 0")
    //-   h2 #[u Favorites]
    //-   .favorites
    //-     .item(v-for="item in favorites", @click="selectItem(item)")
    //-       .desc
    //-         img(:src="item.image" )
    //-         P {{ item.name }}
    //-   hr

    #search-wrapper
      input(type="text", placeholder="shark", v-model="searcheditem")

    .toggles
      button.default(@click="changeSort") SORT BY#[br]#[hr]{{ sort.type[sort.index].toLocaleUpperCase() }}

    .all
      .item(v-for="item in selecteditems", @click="selectItem(item)", :class="{rounded: sort.index === 0}")
        .number(v-show="sort.index !== 0")
          p(v-show="sort.index === 1")
            b(v-show="item.price") #[span $]{{ item.price }}
            b(v-show="!item.price") -
          p(v-show="sort.index === 2") #[b #[span ] {{ item.location }}] #[span.extra {{ item.location_extra }}]
          ul.time(v-show="sort.index === 3")
            li(:data-time="item.time.split(' ').join('')")
              p #[b #[span ] {{ item.time }}]

        .desc
          .image(:style="{backgroundImage: 'url(' + require('../assets/fishes/' + item.image) + ')'}")
          p {{ item.name }}



</template>

<script>
import _ from 'lodash'

export default {
  name: 'All',

  props: ['all'],

  data () {
    return {
      searcheditem: '',
      favorites: [],
      sort: {
        type: ['name', 'price', 'location', 'time'],
        index: 0
      }
    }
  },

  computed: {
    selecteditems () {
      let selected = []
      if (this.searcheditem) {
        selected = this.all.filter(item => item.name.toLowerCase().indexOf(this.searcheditem.toLowerCase()) >= 0)
      } else {
        selected =  JSON.parse(JSON.stringify(this.all))
      }

      let sort = this.sort.type[this.sort.index]
      let direction = 'asc'
      if (sort === 'price') {
        direction = 'desc'
      }
      return _.orderBy(selected, [sort], [direction])
    }
  },

  mounted () {
    // gtag('config', 'UA-93111170-3', {
    //   'page_title': 'landing',
    //   'page_path': '/'
    // })

    this.getSortType()
    this.getFavorites()
  },

  methods: {
    selectItem (item) {
      gtag('event', 'button', {
        'event_category': 'selectitem',
        'event_label': item.name
      })

      // popup
      // this.$router.push('/pokemon/' + pokemon.id)
    },

    getFavorites () {
      let storage = window.localStorage.getItem('favorite')
      if (!storage) {
        return
      }
      let favorites = JSON.parse(storage)
      this.favorites = favorites.map(item => this.all.find(item2 => parseInt(item2.id) === parseInt(item)))
    },

    getSortType () {
      if (!window.localStorage.getItem('sort')) {
        return window.localStorage.setItem('sort', this.sort.index)
      }
      this.sort.index = parseInt(window.localStorage.getItem('sort'))
    },

    changeSort () {
      this.sort.index++
      if (this.sort.index >= this.sort.type.length) {
        this.sort.index = 0
      }
      window.localStorage.setItem('sort', this.sort.index)
    }
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
      margin: 20px auto 0 auto
      width: 300px

      &::after
        content: ""
        display: block
        position: absolute
        z-index: 1
        width: 20px
        height: 20px
        background-size: contain
        right: 10px
        top: 50%
        transform: translateY(-50%)
        opacity: 0.8

      input
        background-color: $white
        border-radius: 20px
        padding: 7px 15px
        border: 1px solid $line
        width: 100%

    h1
      text-align: center

    .toggles
      margin-top: 30px
      padding: 0 50px
      display: flex
      flex-direction: row-reverse

      +mobile
        padding: 0 20px

    .all, .favorites
      margin-top: 30px
      padding: 0 50px
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr))
      grid-gap: 15px

      +mobile
        padding: 0 20px
        display: grid
        grid-template-columns: repeat(4, minmax(60px, 1fr))

      .item
        position: relative
        // cursor: pointer
        transition: all 100ms
        display: flex
        flex-flow: column nowrap

        &.rounded
          .desc
            border-radius: 7px

        // &:hover
        //   transform: scale(1.05)

        // &:active
        //   transform: translateY(3px)

          .desc
            box-shadow: 0 2px 0 $grey-l

        p
          text-align: left
          margin: 0
          font-size: 12px

          +mobile
            font-size: 8px

        .number
          border-radius: 7px 7px 0 0
          background-color: $white
          padding: 4px 5px 0 5px

          +mobile
            width: 100%

          .extra
            font-size: 10px

            +mobile
              font-size: 8px

          ul.time
            +clearlist
            text-align: left

            +clearfix

            li
              float: left
              padding: 3px
              border-radius: 5px

              +mobile
                border-radius: 2px
                padding: 2px

              &[data-time="4am-9pm"]
                background-color: lemonchiffon
              &[data-time="9am-4pm"]
                background-color: aliceblue
              &[data-time="4pm-9am"]
                background-color: moccasin
              &[data-time="9pm-4am"]
                background-color: darkslateblue
                color: white
              &[data-time="AllDay"]
                background-color: darkseagreen
                color: white

        .desc
          width: 100%
          flex-grow: 1
          background-color: $white
          box-shadow: 0 5px 0 $grey-l
          border-radius: 0 0 7px 7px
          padding: 5px
          display: flex
          flex-flow: column nowrap
          transition: all 100ms

          p
            margin-top: 4px
            +mobile
              font-size: 8px

          +mobile
            border-radius: 0 0 7px 7px
            width: 100%

          .image
            background-size: cover
            width: 70px
            height: 70px
            background-repeat: no-repeat
            background-position: center
            align-self: center

            +mobile
              width: 50px
              height: 50px

    .favorites
      margin-top: 20px
      margin-bottom: 20px
      padding: 0

    .favorites-wrapper
      padding: 0 50px

      +mobile
        padding: 0 20px
</style>
