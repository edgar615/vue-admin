<template>
  <b-field>
    <b-checkbox-button v-model="model[paramName]"
                    :native-value="item.dictValue"
                    type="is-success" v-for="item in itemList" :key="item.dictValue">
      <span>{{item.dictText}}</span>
    </b-checkbox-button>
  </b-field>

</template>

<script>
  export default {
    name: 'DictCheckboxButton',
    components: {
    },
    props: {
      dictCode: {
        type: String
      },
      paramName: {
        type: String
      },
      model: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    computed: {
      itemList () {
        return this.dictList(this, this.dictCode)
      }
    }
  }
</script>
