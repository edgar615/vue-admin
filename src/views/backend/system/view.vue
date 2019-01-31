<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="系统标识符" class="static-field">
        <p class="control">
          {{model.sysIdentifier}}
        </p>
      </b-field>

      <b-field label="名称" class="static-field">
        <p class="control">
          {{model.name}}
        </p>
      </b-field>

      <b-field label="排序" class="static-field">
        <p class="control">
          {{model.sorted}}
        </p>
      </b-field>

      <b-field label="类型" class="static-field">
        <p class="control">
          {{ $dictText('systemType',model.type) }}
        </p>
      </b-field>

      <b-field label="内部访问" class="static-field">
        <p class="control">
        <span class="tag is-info">
          {{ $boolText(model.internal) }}
          </span>
        </p>
      </b-field>
    </div>
  </section>
</template>
<script>
  import {getSystem} from '@/api/backend/system'

  export default {
    data() {
      return {
        loading: false,
        model: {}
      }
    },
    methods: {

    },
    created() {
      this.$parent.startLoading()
      this.$getModel(getSystem, this.$parent.$props.props.systemId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('子系统查询失败', err)
      })
    }
  }
</script>
<style>

</style>
