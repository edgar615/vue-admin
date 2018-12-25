<template>
  <b-field>
    <b-radio-button v-model="model[paramName]"
                    :native-value="item.dictValue"
                    type="is-success" v-for="item in itemList" :key="item.dictValue">
      <span>{{item.dictText}}</span>
    </b-radio-button>
    <b-radio-button v-model="model[paramName]"
                    native-value="" type="is-success" v-if="showAll">
      全部
    </b-radio-button>
  </b-field>
</template>

<script>
  export default {
    name: 'DictRadioButton',
    components: {
    },
    props: {
      showAll: {
        type: Boolean,
        default: false
      },
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
