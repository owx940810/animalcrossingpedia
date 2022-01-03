<template lang="pug">
.item(:class="{rounded: sortIndex === 0}")
  .number(v-show="sortIndex !== 0")
    p(v-show="sortIndex === 1")
      b(v-show="item.price") #[span $]{{ item.price }}
      b(v-show="!item.price") -
    p(v-show="sortIndex === 2") #[b #[span ] {{ item.location }}] #[span.extra {{ item.location_extra }}]
    ul.time(v-show="sortIndex === 3")
      li(:data-time="item.time.split(' ').join('')")
        p #[b #[span ] {{ item.time }}]

  .desc
    .shadow-size(v-show="item.shadow") {{ item.shadow }}
    .image(:style="{backgroundImage: 'url(' + require('../assets/' + selectedType + '/icon/' + item.image) + ')' || ''}")
    p #[b {{ item.name }}]
    p(v-show="sortIndex !== 1") ${{ item.price }}
    p(v-show="sortIndex !== 2") {{ item.location }} #[span.extra(v-show="item.location_extra") ({{ item.location_extra }})]
    p.time(v-show="sortIndex !== 3", :data-time="item.time.split(' ').join('')") {{ item.time }}
    .months.north
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
    .months.south
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
export default {
  name: 'Item',

  props: ['item', 'sortIndex', 'selectedType'],

  mounted () {

  },
}
</script>

<style lang="sass" scoped>
  @import '../sass/mixins'
  @import '../sass/variables'

  .item
    position: relative
    // cursor: pointer
    transition: all $speed-very-fast
    display: flex
    flex-flow: column nowrap

    &.rounded
      .desc
        border-radius: 7px

      .desc
        box-shadow: 0 2px 0 $grey-l

    p
      text-align: left
      margin: 0

    .number
      border-radius: 7px 7px 0 0
      background-color: $white
      padding: 5px 5px 0 5px

      +mobile
        width: 100%

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
            background-color: #e6e6e6

    .desc
      width: 100%
      flex-grow: 1
      background-color: $white
      box-shadow: 0 5px 0 $grey-l
      border-radius: 0 0 7px 7px
      padding: 5px
      display: flex
      flex-flow: column nowrap
      transition: all $speed-very-fast

      .shadow-size
        position: absolute
        top: 0
        right: -12px
        transform: translateY(-50%)
        border-radius: 22px
        background-color: $shadow
        color: white
        display: grid
        place-items: center center
        line-height: 1
        font-weight: bold
        padding: 4px 7px

      p
        margin-top: 4px

        &.time
          border-radius: 2px
          padding: 3px 5px
          align-self: flex-start

          +mobile
            padding: 2px
            border-radius: 2px

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
          background-color: #e6e6e6

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
          padding: 3px
          border-radius: 2px
          background-color: white
          opacity: 0.2
          font-family: "Share Tech Mono", monospace;
          text-align: center

          &.active
            opacity: 1

            & + li.active

</style>
