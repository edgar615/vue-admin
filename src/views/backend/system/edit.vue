<template>
  <section>
    <div class="card">
      <div class="card-content">
          <jcc-field label="标识符" horizontal class="static-field">
            <p class="control">
              {{model.sysIdentifier}}
            </p>
          </jcc-field>

          <!--horizontal使用:message="errors.first('sorted')
         "显示错误提示会导致元素向左便宜，垂直布局没这个问题，可以直接使用:message显示错误提示-->
          <jcc-field label="名称" horizontal
                   :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="名称" class="w-50"></b-input>
          </jcc-field>

        <jcc-field label="图标" horizontal  :type="errors.has('icon') ? 'is-danger' : ''" :message="errors.first('icon')">
          <b-input name="icon" v-model="model.icon"
                   v-validate="'required|max:32'"  data-vv-as="图标" class="w-25"></b-input>
        </jcc-field>
          <jcc-field label="排序" horizontal
                   :type="errors.has('sorted') ? 'is-danger' : ''"
                     :message="errors.first('sorted')">
            <b-input name="sorted" expanded v-model="model.sorted"
                     v-validate="'required|numeric|min_value:0|max_value:9999'"
                     data-vv-as="排序" class="w-25">
            </b-input>
          </jcc-field>

          <jcc-field  label="类型" horizontal class="static-field">
            <p class="control">
              {{ dictText(this, "systemType",model.type) }}
            </p>
          </jcc-field>

          <jcc-field  label="内部访问" horizontal class="static-field">
            <p class="control">
            <span class="tag is-info">
              {{ dictText(this, "internal",model.internal) }}
              </span>
            </p>
          </jcc-field>
        <jcc-field  label="SP访问权限" horizontal class="static-field">
          <p class="control">
            <span class="tag is-info">
              {{ dictText(this, "bool",model.spVisible) }}
              </span>
          </p>
        </jcc-field>
        <jcc-field  label="SO访问权限" horizontal class="static-field">
          <p class="control">
            <span class="tag is-info">
              {{ dictText(this, "bool",model.soVisible) }}
              </span>
          </p>
        </jcc-field>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="save" :disabled='errors.any()'
                    :class="{'is-loading' : saving}">
              <b-icon icon="check-circle"></b-icon>
              <span>保存</span>
            </button>
            <button class="button" @click="back">
              <b-icon icon="undo"></b-icon>
              <span>返回</span>
            </button>
          </p>
        </b-field>
        </div>
      </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  export default {
    data() {
    return {
      loading: false,
      saving: false,
      model: {
      }
    }
  },
  methods: {
      back() {
        this.$router.back();
      },
      save() {
        const vm = this
        vm.updateModel(vm, "/system", vm.$route.params.id, () => vm.$router.push({ path: '/backend/system' }))
      }
    },
  created () {
    this.getModel(this, "/system", this.$route.params.id)
    }
  }
</script>
<style>

</style>
