<template>
  <jcc-field :label="meta.alias" :horizontal="horizontal"
             :type="fieldType"
             :message="helpMessage"
             :class="(editField && meta.immutable) ? 'static-field ': ''">
    <p class="control" v-if="editField && meta.immutable && model[meta.name] != undefined">
      {{model[meta.name]}}
    </p>
    <b-input v-else :name="meta.name" v-model="model[meta.name]"
             v-validate="expression"
              :data-vv-as="meta.alias" class="w-50"></b-input>
  </jcc-field>
</template>

<script>
  import JccField from '../field/Field.vue'
  export default {
    name: 'JccMetaInput',
    components: {
      'jcc-field': JccField
    },
    inject: ['$validator'],
    props: {
      meta: {
        type: Object,
        default: {}
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      editField: {
        type: Boolean,
        default: false
      },
      model: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      //默认值得计算还有问题
      // if (this.meta.defaultValue != undefined && this.model[this.meta.name] == undefined) {
      //    this.model[this.meta.name] = this.meta.defaultValue
      // };
    },
    computed: {
        expression() {
          const validate = {};
          if (this.meta.required) {
            validate.required = this.meta.required;
          }
          if (this.meta.minLength) {
            validate.min = this.meta.minLength;
          }
          if (this.meta.maxLength) {
            validate.max = this.meta.maxLength;
          }
          if (this.meta.minValue) {
            validate.min_value = this.meta.minValue;
          }
          if (this.meta.maxValue) {
            validate.max_value = this.meta.maxValue;
          }
          if (this.meta.regex) {
            validate.regex = this.meta.regex;
          }
          return validate;
        },
      fieldType() {
        if (this.errors.has(''+ this.meta.name)) {
          return 'is-danger';
        }
        return ''
      },
      helpMessage() {
          const msg = [];
        msg.push(this.errors.first(''+ this.meta.name))
        if (this.meta.regex) {
          msg.push("需要满足正则表达式:" + this.meta.regex);
        }
        return msg;
      }
    }
  }

</script>
