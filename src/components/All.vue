<template lang="pug">
  #all
    //- .favorites-wrapper(v-if="favorites.length > 0")
    //-   h2 #[u Favorites]
    //-   .favorites
    //-     .item(v-for="item in favorites", @click="selectItem(item)")
    //-       .desc
    //-         img(:src="item.image" )
    //-         P {{ item.name }}

    #filter-wrapper
      .wrapper
        p FILTERS
        .filter-containers
          .filter-container
            p HEMISPHERE:
            .filters
              label
                input(type="checkbox" value="north" v-model="filterProperties.hemisphere" @click="gtagging('hemisphere', 'north')")
                span north
              label
                input(type="checkbox" value="south" v-model="filterProperties.hemisphere" @click="gtagging('hemisphere', 'south')")
                span south

          .filter-container
            p MONTHS:
            .filters
              label
                input(type="checkbox" value="January" v-model="filterProperties.months" @click="gtagging('month', 'january')")
                span Jan
              label
                input(type="checkbox" value="February" v-model="filterProperties.months" @click="gtagging('month', 'february')")
                span Feb
              label
                input(type="checkbox" value="March" v-model="filterProperties.months" @click="gtagging('month', 'march')")
                span Mar
              label
                input(type="checkbox" value="April" v-model="filterProperties.months" @click="gtagging('month', 'april')")
                span Apr
              label
                input(type="checkbox" value="May" v-model="filterProperties.months" @click="gtagging('month', 'may')")
                span May
              label
                input(type="checkbox" value="June" v-model="filterProperties.months" @click="gtagging('month', 'june')")
                span Jun
              label
                input(type="checkbox" value="July" v-model="filterProperties.months" @click="gtagging('month', 'july')")
                span Jul
              label
                input(type="checkbox" value="August" v-model="filterProperties.months" @click="gtagging('month', 'august')")
                span Aug
              label
                input(type="checkbox" value="September" v-model="filterProperties.months" @click="gtagging('month', 'september')")
                span Sep
              label
                input(type="checkbox" value="October" v-model="filterProperties.months" @click="gtagging('month', 'october')")
                span Oct
              label
                input(type="checkbox" value="November" v-model="filterProperties.months" @click="gtagging('month', 'november')")
                span Nov
              label
                input(type="checkbox" value="December" v-model="filterProperties.months" @click="gtagging('month', 'december')")
                span Dec

          .filter-container
            p LOCATION:
            .filters
              label
                input(type="checkbox" value="River" v-model="filterProperties.location" @click="gtagging('location', 'river')")
                span river
              label
                input(type="checkbox" value="Pond" v-model="filterProperties.location" @click="gtagging('location', 'pond')")
                span pond
              label
                input(type="checkbox" value="Sea" v-model="filterProperties.location" @click="gtagging('location', 'sea')")
                span sea
              label
                input(type="checkbox" value="Pier" v-model="filterProperties.location" @click="gtagging('location', 'pier')")
                span pier

    hr

    #search-wrapper
      input(type="text", placeholder="eg: shark", v-model="searcheditem")

    .toggles
      button.default(@click="changeSort") SORT BY#[br]#[hr]{{ sort.type[sort.index].toLocaleUpperCase() }}

    .all
      .item(v-for="item in selecteditems", :class="{rounded: sort.index === 0}")
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
          p(v-show="sort.index === 0") #[b {{ item.name }}]
          p(v-show="sort.index !== 0") {{ item.name }}
          p(v-show="sort.index !== 1") ${{ item.price }}
          p(v-show="sort.index !== 2") {{ item.location }} #[span.extra(v-show="item.location_extra") ({{ item.location_extra }})]
          p.time(v-show="sort.index !== 3", :data-time="item.time.split(' ').join('')") {{ item.time }}
          .months.north(v-show="sort.index !== 4")
            p north:
            ul(:class="{allmonths: item.north.indexOf('All Months') >= 0}")
              li(:class="{active: item.north.indexOf('January') >= 0}") J
              li(:class="{active: item.north.indexOf('February') >= 0}") F
              li(:class="{active: item.north.indexOf('March') >= 0}") M
              li(:class="{active: item.north.indexOf('April') >= 0}") A
              li(:class="{active: item.north.indexOf('May') >= 0}") M
              li(:class="{active: item.north.indexOf('June') >= 0}") J
              li(:class="{active: item.north.indexOf('July') >= 0}") J
              li(:class="{active: item.north.indexOf('August') >= 0}") A
              li(:class="{active: item.north.indexOf('September') >= 0}") S
              li(:class="{active: item.north.indexOf('October') >= 0}") O
              li(:class="{active: item.north.indexOf('November') >= 0}") N
              li(:class="{active: item.north.indexOf('December') >= 0}") D
          .months.south(v-show="sort.index !== 4")
            p south:
            ul(:class="{allmonths: item.south.indexOf('All Months') >= 0}")
              li(:class="{active: item.south.indexOf('January') >= 0}") J
              li(:class="{active: item.south.indexOf('February') >= 0}") F
              li(:class="{active: item.south.indexOf('March') >= 0}") M
              li(:class="{active: item.south.indexOf('April') >= 0}") A
              li(:class="{active: item.south.indexOf('May') >= 0}") M
              li(:class="{active: item.south.indexOf('June') >= 0}") J
              li(:class="{active: item.south.indexOf('July') >= 0}") J
              li(:class="{active: item.south.indexOf('August') >= 0}") A
              li(:class="{active: item.south.indexOf('September') >= 0}") S
              li(:class="{active: item.south.indexOf('October') >= 0}") O
              li(:class="{active: item.south.indexOf('November') >= 0}") N
              li(:class="{active: item.south.indexOf('December') >= 0}") D


</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'All',

    props: ['all'],

    data () {
      return {
        filterProperties: {
          hemisphere: [],
          months: [],
          location: []
        },
        searcheditem: '',
        favorites: [],
        sort: {
          type: ['name', 'price', 'location', 'time'],
          index: 0
        }
      }
    },

    // watch: {
    //   "filterProperties.hemisphere": {
    //     handler (val) {
    //       gtag('event', 'button', {
    //         'event_category': 'filter single hemisphere',
    //         'event_label': val.join(', ')
    //       })

    //       if (val.length > 1) {
    //         gtag('event', 'button', {
    //           'event_category': 'filter multiple hemispheres',
    //           'event_label': val.join(', ')
    //         })
    //       }
    //     }
    //   },

    //   "filterProperties.months": {
    //     handler (val) {
    //       gtag('event', 'button', {
    //         'event_category': 'filter single month',
    //         'event_label': val.join(', ')
    //       })

    //       if (val.length > 1) {
    //         gtag('event', 'button', {
    //           'event_category': 'filter multiple months',
    //           'event_label': val.join(', ')
    //         })
    //       }
    //     }
    //   },

    //   "filterProperties.location": {
    //     handler (val) {
    //       gtag('event', 'button', {
    //         'event_category': 'filter single location',
    //         'event_label': val.join(', ')
    //       })

    //       if (val.length > 1) {
    //         gtag('event', 'button', {
    //           'event_category': 'filter multiple locations',
    //           'event_label': val.join(', ')
    //         })
    //       }
    //     }
    //   }
    // },

    computed: {
      filteredItems () {
        let arr = JSON.parse(JSON.stringify(this.all))

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
        if (sort === 'price') {
          direction = 'desc'
        }
        return _.orderBy(selected, [sort], [direction])
      }
    },

    mounted () {
      this.getSortType()
      this.getFavorites()
    },

    methods: {
      gtagging (category, val) {
        gtag('event', 'button', {
          'event_category': `filter ${category}`,
          'event_label': val
        })
      },

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
      },

      filterHemisphere () {

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

    > hr
      width: calc(100% - 100px)
      margin-top: 60px

    #search-wrapper
      position: relative
      display: block
      margin: 40px auto 0 auto
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
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))
      grid-gap: 15px

      +mobile
        padding: 0 20px
        display: grid
        grid-template-columns: repeat(3, minmax(60px, 1fr))

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
              border-radius: 2px

              +mobile
                border-radius: 2px
                padding: 2px

              &[data-time="4am-9pm"]
                background-color: lemonchiffon
              &[data-time="9am-4pm"]
                background-color: lavender
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

            &.time
              font-size: 10px
              border-radius: 2px
              padding: 2px 5px
              align-self: flex-start

              +mobile
                padding: 2px
                border-radius: 2px
                font-size: 8px

            &[data-time="4am-9pm"]
              background-color: #AED6F1
            &[data-time="9am-4pm"]
              background-color: #76D7C4
            &[data-time="4pm-9am"]
              background-color: #DC7633
              color: white
            &[data-time="9pm-4am"]
              background-color: #34495E
              color: white
            &[data-time="AllDay"]
              background-color: #2E4053
              color: white

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

          .months
            padding: 2px 5px 5px
            margin: 3px 0 0
            border-radius: 5px

            &.north
              background-color: #D1F2EB
            &.south
              background-color: #FCF3CF

            p
              margin-top: 0
              display: block

            ul
              list-style-type: none
              padding: 0
              margin: 2px 0 0
              display: grid
              grid-template-columns: repeat(12, 1fr)
              border-radius: 2px
              align-items: strech
              justify-items: stretch

              +mobile
                grid-template-columns: repeat(6, 1fr)

              &.allmonths
                li
                  opacity: 1

            li
              line-height: 1
              font-size: 11px
              padding: 2px
              border-radius: 2px
              background-color: white
              opacity: 0.2
              font-family: "Share Tech Mono", monospace;
              text-align: center

              &.active
                opacity: 1

                & + li.active


              +mobile
                font-size: 8px



    .favorites
      margin-top: 20px
      margin-bottom: 20px
      padding: 0

    .favorites-wrapper
      padding: 0 50px

      +mobile
        padding: 0 20px

    #filter-wrapper
      margin-top: 30px
      padding: 0 50px
      font-family: "Share Tech Mono", sans-serif
      font-size: 14px

      +mobile
        padding: 0 20px
        font-size: 10px

      .wrapper
        padding: 10px 20px
        background-color: $white
        border-radius: 7px
        border: 0
        box-shadow: 0 5px 0 $grey-l
        transition: all 100ms

    .filter-containers
      margin-top: 20px
      display: flex
      flex-flow: row wrap
      justify-content: space-between

      .filter-container
        & + .filter-container
          margin-left: 20px
          +mobile
            margin-left: 0
            margin-top: 10px

        .filters
          margin-top: 10px
          display: flex
          flex-flow: row wrap
          +mobile
            transform: translate(-5px, -5px)

          label
            position: relative
            cursor: pointer
            +mobile
              margin-left: 5px
              margin-top: 5px

            & + label
              margin-left: 5px

            span
              padding: 2px 4px
              display: block
              border-radius: 2px
              border: 1px solid black
              opacity: 0.2
              transition: all 100ms ease-in-out

            input
              visibility: hidden
              position: absolute

              &:checked + span
                opacity: 1

</style>
