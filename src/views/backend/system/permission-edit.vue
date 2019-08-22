<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="类型"  class="required-field"
                 :type="errors.has('type') ? 'is-danger' : ''"
                 :message="errors.first('type')">
        <b-select name="type" expanded v-model="model.type"
                  v-validate="'required'" data-vv-as="类型" class="w-25">
          <option
              v-for="option in $dictList('permissionType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>

      <b-field label="名称"  class="required-field"
                 :type="errors.has('name') ? 'is-danger' : ''"
                 :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
      </b-field>
      <b-field label="权限值"
                 :type="errors.has('permission') ? 'is-danger' : ''"
                 :message="errors.first('permission')"
                 v-show="model.type != 3">
        <b-input name="permission" v-model="model.permission"
                 v-validate="'max:64|alpha_symbol'" data-vv-as="权限值"></b-input>
      </b-field>
      <b-field label="菜单路径"  class="required-field"
                 :type="errors.has('path') ? 'is-danger' : ''"
                 :message="errors.first('path')"
                 v-show="model.type == 1">
        <b-input name="path" v-model="model.path"
                 v-validate="model.type == 1 ? 'required|max:64|menu' : '' " data-vv-as="菜单路径"></b-input>
      </b-field>
      <b-field label="图标"  class="required-field"
                 :type="errors.has('icon') ? 'is-danger' : ''"
                 :message="errors.first('icon')"
                 v-show="model.type != 2">
        <b-input name="icon" v-model="model.icon"
                 v-validate="model.type == 1 ? 'required|max:32' : '' " data-vv-as="图标" class="w-25"></b-input>
      </b-field>
      <b-field label="排序"  class="required-field"
                 :message="errors.first('sorted')"
                 :type="errors.has('sorted') ? 'is-danger' : ''">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序" class="w-25">
        </b-input>
      </b-field>
      <b-field label="描述"
                 :type="errors.has('description') ? 'is-danger' : ''"
                 :message="errors.first('description')"
                 v-show="model.type == 1">
        <textarea name="description" v-model="model.description" data-vv-as="描述" cols="100"></textarea>
      </b-field>
      <b-field class="field"  message="不显示在菜单上"
                 v-show="model.type == 1">
        <b-switch v-model="model.hidden"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          隐藏
        </b-switch>
      </b-field>
      <b-field class="field"  message="每个父菜单只有一个默认地址"
                 v-show="model.type == 1">
        <b-switch v-model="model.acquiescent"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          默认地址
        </b-switch>
      </b-field>
    </div>
    <div class="form-modal-card-footer">
      <button class="button is-primary" @click="save" :disabled='errors.any()'
              :class="{'is-loading' : saving}">
        <span>保存</span>
      </button>
      <button class="button" @click="$parent.cancel()">
        <span>关闭</span>
      </button>
    </div>
  </section>
</template>
<script>
  import {getMenu, updateMenu} from '@/api/backend/system'

  export default {
    data () {
      return {
        loading: false,
        saving: false,
        model: {}
      }
    },
    methods: {
      save () {
        const vm = this
        vm.$updateModal(updateMenu, this.$parent.$props.props.sysPermissionId, resp => {
          vm.$parent.succeed('菜单保存成功', resp)
        }, err => {
          vm.$parent.fail('菜单保存失败', err)
        })
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(getMenu, this.$parent.$props.props.sysPermissionId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('菜单查询失败', err)
      })
    }
  }
</script>
<style>

</style>
