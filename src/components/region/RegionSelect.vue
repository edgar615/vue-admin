<template>
  <section>
    <b-field label="Simple">
      <b-select placeholder="省" v-model="provinceCode">
        <option
          v-for="option in proviceList"
          :value="option.regionCode"
          :key="option.regionCode">
          {{ option.name }}
        </option>
      </b-select>
      <b-select placeholder="市" v-model="cityCode">
        <option
          v-for="option in cityList"
          :value="option.regionCode"
          :key="option.regionCode">
          {{ option.name }}
        </option>
      </b-select>
      <b-select placeholder="区" v-model="areaCode">
        <option
          v-for="option in areaList"
          :value="option.regionCode"
          :key="option.regionCode">
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
  </section>
</template>

<script>
  export default {
    name: 'RegionSelect',
    components: {
    },
    props: {
    },
    data () {
      return {
        provinceCode: '',
        cityCode: '',
        areaCode: ''
      }
    },
    computed: {
      proviceList () {
        return this.$store.getters.region.filter(function (item) {
          return item.parentRegion === '100000'
        })
      },
      cityList () {
        const vm = this
        if (this.provinceCode) {
          return this.$store.getters.region.filter(function (item) {
            return item.parentRegion === vm.provinceCode
          })
        } else {
          return []
        }
      },
      areaList () {
        const vm = this
        if (this.cityCode) {
          return this.$store.getters.region.filter(function (item) {
            return item.parentRegion === vm.cityCode
          })
        } else {
          return []
        }
      }
    },
    watch: {
      /**
       * Set internal message when prop change.
       */
      provinceCode (value) {
        this.cityCode = value
      },
      cityCode (value) {
        this.areaCode = value
      }
    }
  }
</script>
