<template>
  <section>
    <nav class="level page-content-top">
      <!-- Left side -->
      <div class="level-left">
      </div>
    </nav>
    <div class="columns is-full-content">
      <div class="column is-one-fifth">
        <div class="box-content notification is-primary" data-simplebar>
            <vue-tree :tree-data="treeData" :options="options"
                      @handle="itemClick"></vue-tree>
        </div>
      </div>
      <div class="column ml-2" v-show="viewMenu">
        <div class="card">
          <div class="card-content">
            <b-field label="类型" horizontal class="static-field">
              <p class="control static-field">{{$dictText('permissionType', model.type)}}</p>
            </b-field>
            <b-field label="名称" horizontal class="static-field">
              <p class="control static-field">{{model.name}}</p>
            </b-field>
            <b-field label="权限值" horizontal class="static-field" v-show="model.type != 3">
              <p class="control">{{model.permission}}</p>
            </b-field>
            <b-field label="菜单路径" horizontal class="static-field" v-show="model.type == 1">
              <p class="control">{{model.path}}</p>
            </b-field>
            <b-field label="图标" horizontal class="static-field" v-show="model.type != 2">
              <p class="control">{{model.icon}}</p>
            </b-field>
            <b-field label="排序" horizontal class="static-field">
              <p class="control">{{model.sorted}}</p>
            </b-field>
            <b-field label="隐藏?" horizontal class="static-field" v-show="model.type == 1">
              <p class="control">{{model.hidden}}</p>
            </b-field>
            <b-field label="默认地址?" horizontal class="static-field" v-show="model.type == 1">
              <p class="control">{{model.acquiescent}}</p>
            </b-field>
            <b-field label="标题" horizontal class="static-field" v-show="model.type == 1">
              <p class="control">{{model.title}}</p>
            </b-field>
            <b-field label="描述" horizontal class="static-field" v-show="model.type == 1">
              <p class="control">{{model.description}}</p>
            </b-field>
            <b-field v-if="model.sysPermissionId" horizontal>
              <p class="control">
                <button class="button m-1" @click="onAdd(model.sysPermissionId)"
                        v-show="model.level < 3">
                  <b-icon icon="plus-circle-outline"></b-icon>
                  <span>新增权限</span>
                </button>
                <button class="button m-1" @click="onEdit">
                  <b-icon icon="circle-edit-outline"></b-icon>
                  <span>修改</span>
                </button>
                <button class="button m-1 is-danger" @click="onDelete(model.sysPermissionId)"
                        :class="{'is-loading' : deleting}">
                  <b-icon icon="delete-outline"></b-icon>
                  <span>删除</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>

      <div class="column ml-2" v-show="addMenu">
        <div class="card">
          <div class="card-content">
            <jcc-field label="类型" horizontal class="required-field"
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
            </jcc-field>

            <jcc-field label="名称" horizontal class="required-field"
                       :type="errors.has('name') ? 'is-danger' : ''"
                       :message="errors.first('name')">
              <b-input name="name" v-model="model.name"
                       v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
            </jcc-field>
            <jcc-field label="权限值" horizontal
                       :type="errors.has('permission') ? 'is-danger' : ''"
                       :message="errors.first('permission')"
                       v-show="model.type != 3">
              <b-input name="permission" v-model="model.permission"
                       v-validate="'max:64|alpha_symbol'" data-vv-as="权限值"></b-input>
            </jcc-field>
            <jcc-field label="菜单路径" horizontal class="required-field"
                       :type="errors.has('path') ? 'is-danger' : ''"
                       :message="errors.first('path')"
                       v-show="model.type == 1">
              <b-input name="path" v-model="model.path"
                       v-validate="model.type == 1 ? 'required|max:64|menu' : '' " data-vv-as="菜单路径"></b-input>
            </jcc-field>
            <jcc-field label="图标" horizontal class="required-field"
                       :type="errors.has('icon') ? 'is-danger' : ''"
                       :message="errors.first('icon')"
                       v-show="model.type != 2">
              <b-input name="icon" v-model="model.icon"
                       v-validate="model.type == 1 ? 'required|max:32' : '' " data-vv-as="图标" class="w-25"></b-input>
            </jcc-field>
            <jcc-field label="排序" horizontal class="required-field"
                       :message="errors.first('sorted')"
                       :type="errors.has('sorted') ? 'is-danger' : ''">
              <b-input name="sorted" expanded v-model="model.sorted"
                       v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序" class="w-25">
              </b-input>
            </jcc-field>
            <jcc-field label="标题" horizontal
                       :type="errors.has('title') ? 'is-danger' : ''"
                       :message="errors.first('title')"
                       v-show="model.type == 1">
              <b-input name="title" v-model="model.title" data-vv-as="标题"></b-input>
            </jcc-field>
            <jcc-field label="描述" horizontal
                       :type="errors.has('description') ? 'is-danger' : ''"
                       :message="errors.first('description')"
                       v-show="model.type == 1">
              <textarea name="description" v-model="model.description" data-vv-as="描述" cols="100"></textarea>
            </jcc-field>
            <jcc-field class="field" horizontal message="不显示在菜单上"
                       v-show="model.type == 1">
              <b-switch v-model="model.hidden"
                        true-value="true"
                        false-value="false"
                        type="is-info">
                隐藏
              </b-switch>
            </jcc-field>
            <jcc-field class="field" horizontal message="每个父菜单只有一个默认地址"
                       v-show="model.type == 1">
              <b-switch v-model="model.acquiescent"
                        true-value="true"
                        false-value="false"
                        type="is-info">
                默认地址
              </b-switch>
            </jcc-field>
            <jcc-field class="field" horizontal message="辅助功能，自动生成CRUD菜单"
                       v-show="model.type == 1">
              <b-switch v-model="model.autoGen"
                        true-value="true"
                        false-value="false"
                        type="is-info">
                自动生成CRUD菜单
              </b-switch>
            </jcc-field>
            <b-field horizontal><!-- Label left empty for spacing -->
              <p class="control">
                <button class="button is-primary" @click="save" :disabled='errors.any()'
                        :class="{'is-loading' : saving}">
                  <b-icon icon="check-circle"></b-icon>
                  <span>保存</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .box-content {
    height: 600px;
    overflow: auto;
  }
</style>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import {menuList, getMenu, addMenu, deleteMenu, updateMenu} from '@/api/backend/system'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
        subsystemId: this.$route.params.id,
        deleting: false,
        model: {},
        saving: false,
        addMenu: false,
        viewMenu: false,
        // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
//              checkedIds: ["4"],
        // tree数据
        treeData: [],
        // 设置项
        options: {
          // Number,初始化时展开层级,根节点为0,默认0
          label: 'name',
          depthOpen: 6,
          checkbox: false,
          showEdit: false,
          showDelete: false,
          showAdd: false,
          openIcon: 'mdi mdi-chevron-right',
          closeIcon: 'mdi mdi-chevron-down',
          checkedIcon: 'mdi mdi-checkbox-marked-outline',
          uncheckedIcon: 'mdi mdi-checkbox-blank-outline',
          halfCheckedIcon: 'mdi mdi-checkbox-intermediate'
        }
      }
    },
    methods: {
      onAdd (id) {
        this.addMenu = true
        this.viewMenu = false
        this.model = {parentId: id, subsystemId: this.subsystemId}
      },
      itemClick (item) {
        const id = item.id
        this.model = {}
        if (id === -1 || id === undefined) {
          this.addMenu = true
          this.viewMenu = false
          this.model = {parentId: id, subsystemId: this.subsystemId}
        } else {
          this.viewMenu = true
          this.addMenu = false
          getMenu(id).then(response => {
            this.model = response.data
          })
        }
      },
      onEdit (id) {
        this.addMenu = true
        this.viewMenu = false
      },
      onDelete (id) {
        const vm = this
        vm.$deleteConfirm(() => {
          vm.deleting = true
          deleteMenu(id).then(response => {
            vm.deleting = false
            vm.model = {subsystemId: vm.subsystemId}
            vm.$successToast()
            vm.loadAsyncData()
          }).catch(err => {
            vm.deleting = false
          })
        })
      },
      save () {
        const vm = this
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.saving = true
            if (vm.model.sysPermissionId) {
              updateMenu(vm.model.sysPermissionId, vm.model).then(response => {
                vm.saving = false
                vm.$successToast()
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addMenu(vm.model).then(response => {
                vm.saving = false
                vm.$successToast()
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            }

          }
        })
      },
      loadAsyncData () {
        const vm = this
        vm.loading = true
        this.addMenu = false
        this.viewMenu = false
        menuList(this.$route.params.id).then(response => {
          const data = {
            id: -1,
            name: '根目录',
            children: []
          }
          if (response.data && response.data.length > 0) {
            data.children = response.data
          }
          vm.treeData = [data]
          vm.loading = false
        })
      }
    },
    created () {
      this.loadAsyncData()
    }
  }
</script>
