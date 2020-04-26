<template lang="pug">
  #filter-component(:class="{active: filterDropdownState}")
    .title-wrapper(@click="openFilterDropdown")
      p FILTERS
      button.dropdown
    .filter-containers
      .filter-container
        p HEMISPHERE:
        .filters
          label
            input(type="checkbox" value="north" v-model="tempFilterProperties.hemisphere" @click="gtagging('hemisphere', 'north')")
            span north
          label
            input(type="checkbox" value="south" v-model="tempFilterProperties.hemisphere" @click="gtagging('hemisphere', 'south')")
            span south

      .filter-container
        p MONTHS:
        .filters
          label
            input(type="checkbox" value="January" v-model="tempFilterProperties.months" @click="gtagging('month', 'january')")
            span Jan
          label
            input(type="checkbox" value="February" v-model="tempFilterProperties.months" @click="gtagging('month', 'february')")
            span Feb
          label
            input(type="checkbox" value="March" v-model="tempFilterProperties.months" @click="gtagging('month', 'march')")
            span Mar
          label
            input(type="checkbox" value="April" v-model="tempFilterProperties.months" @click="gtagging('month', 'april')")
            span Apr
          label
            input(type="checkbox" value="May" v-model="tempFilterProperties.months" @click="gtagging('month', 'may')")
            span May
          label
            input(type="checkbox" value="June" v-model="tempFilterProperties.months" @click="gtagging('month', 'june')")
            span Jun
          label
            input(type="checkbox" value="July" v-model="tempFilterProperties.months" @click="gtagging('month', 'july')")
            span Jul
          label
            input(type="checkbox" value="August" v-model="tempFilterProperties.months" @click="gtagging('month', 'august')")
            span Aug
          label
            input(type="checkbox" value="September" v-model="tempFilterProperties.months" @click="gtagging('month', 'september')")
            span Sep
          label
            input(type="checkbox" value="October" v-model="tempFilterProperties.months" @click="gtagging('month', 'october')")
            span Oct
          label
            input(type="checkbox" value="November" v-model="tempFilterProperties.months" @click="gtagging('month', 'november')")
            span Nov
          label
            input(type="checkbox" value="December" v-model="tempFilterProperties.months" @click="gtagging('month', 'december')")
            span Dec

      .filter-container
        p LOCATION:
        .filters
          label
            input(type="checkbox" value="River" v-model="tempFilterProperties.location" @click="gtagging('location', 'river')")
            span river
          label
            input(type="checkbox" value="Pond" v-model="tempFilterProperties.location" @click="gtagging('location', 'pond')")
            span pond
          label
            input(type="checkbox" value="Sea" v-model="tempFilterProperties.location" @click="gtagging('location', 'sea')")
            span sea
          label
            input(type="checkbox" value="Pier" v-model="tempFilterProperties.location" @click="gtagging('location', 'pier')")
            span pier

      button.default.apply-filter(@click="applyFilters") Apply Filter

</template>

<script>
export default {
  name: 'FilterComponent',

  props: ['filterProperties'],

  data () {
    return {
      filterDropdownState: false,
      tempFilterProperties: {
        hemisphere: [],
        months: [],
        location: []
      },
    }
  },

  watch: {
    'tempFilterProperties.hemisphere': {
      handler (val) {
        if (val.length > 1) {
          gtag('event', 'filter multiple', {
            event_category: 'hemisphere',
            event_label: val.join(', '),
            value: val.length
          })
        }
      }
    },

    'tempFilterProperties.months': {
      handler (val) {
        if (val.length > 1) {
          gtag('event', 'filter multiple', {
            event_category: 'month',
            event_label: val.join(', '),
            value: val.length
          })
        }
      }
    },

    'tempFilterProperties.location': {
      handler (val) {
        if (val.length > 1) {
          gtag('event', 'filter multiple', {
            event_category: 'location',
            event_label: val.join(', '),
            value: val.length
          })
        }
      }
    }
  },

  mounted () {
  },

  methods: {
    openFilterDropdown () {
      if (this.filterDropdownState) {
        this.closeFilterDropdown
        return
      }
      gtag('event', 'filter')
      this.filterDropdownState = true
    },

    closeFilterDropdown (e) {
      this.filterDropdownState = false
    },

    gtagging (category, val) {
      gtag('event', 'filter', {
        event_category: category,
        event_label: val
      })
    },

    applyFilters () {
      this.filterProperties.hemisphere = this.tempFilterProperties.hemisphere
      this.filterProperties.months = this.tempFilterProperties.months
      this.filterProperties.location = this.tempFilterProperties.location

      gtag('event', 'apply filter', {
        event_category: 'button',
        event_label: 'Apply Filter'
      })
    }
  }
}
</script>

<style lang="sass">
  @import '../sass/mixins'
  @import '../sass/variables'

  #filter-component
    position: fixed
    top: 0
    left: 0
    z-index: 1
    font-family: "Share Tech Mono", sans-serif
    width: 100%
    box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.3)
    cursor: pointer

    .title-wrapper
      padding: 15px 20px
      background-color: $white

      button.dropdown
        background-color: white
        border: 0
        position: absolute
        top: 9px
        right: 20px
        background-image: url("../assets/feather/chevron-down.svg")
        background-size: contain
        background-repeat: no-repeat
        transition: all $speed-fast ease-in-out
        width: 24px
        height: 24px

    .filter-containers
      width: 100%
      display: flex
      flex-flow: row wrap
      justify-content: space-between
      opacity: 0
      transform: translateY(-100px)
      transition: transform $speed-normal ease-in-out, opacity $speed-fast ease-in-out, top 0ms $speed-normal, left 0ms $speed-normal
      border-radius: 0 0 7px 7px
      border: 0
      box-shadow: 0 5px 0 $grey-l
      background-color: white
      padding: 20px
      position: absolute
      top: 0
      left: 100%
      z-index: -1

      +mobile
        flex-flow: column nowrap

      button.apply-filter
        flex: 0 0 auto
        +mobile
          align-self: flex-end

      .filter-container
        margin-right: 20px
        margin-bottom: 10px

        +mobile
          margin-right: 0
          margin-bottom: 0

        &:last-child
          margin-right: 0

        & + .filter-container
          +mobile
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
              transition: all $speed-very-fast ease-in-out

            input
              visibility: hidden
              position: absolute

              &:checked + span
                opacity: 1

    &.active
      .dropdown
        transform: rotate(-180deg)

      .filter-containers
        top: 100%
        left: 0
        opacity: 1
        transform: translateY(0)
        transition: transform $speed-very-fast ease-in-out, opacity $speed-fast ease-in-out

</style>
