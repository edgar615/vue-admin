<template>
  <section class="ml-2 mt-3">
    <div class="columns">
      <div class="column is-one-fifth  is-size-7 border-1 box-shadow vue-tree">
        <vue-tree :tree-data="treeData" :options="options"
                  @handle="itemClick"></vue-tree>
      </div>
      <div class="column border-1  ml-2" v-show="viewRole">
        <div class="menus_box">
          <b-field label="名称" horizontal class="static-field">
            <p class="control static-field">{{model.name}}</p>
          </b-field>
          <b-field label="角色编码" horizontal class="static-field">
            <p class="control static-field">{{model.roleCode}}</p>
          </b-field>
          <b-field label="排序" horizontal class="static-field">
            <p class="control">{{model.sorted}}</p>
          </b-field>
          <b-field><!-- Label left empty for spacing -->
            <p class="control"
               style="padding-left: 100px; box-sizing: border-box; margin-top: 50px;">
              <button class="button is-primary" @click="onAdd(model.sysRoleId)">
                <b-icon icon="plus-circle-outline"></b-icon>
                <span>新增角色</span>
              </button>
              <button class="button is-link" @click="onEdit">
                <b-icon icon="circle-edit-outline"></b-icon>
                <span>修改角色</span>
              </button>
              <button class="button is-danger" style="height: 2.4em;"
                      @click="onDelete(model.sysRoleId)"
                      :class="{'is-loading' : deleting}">
                <b-icon icon="delete-outline"></b-icon>
                <span>删除</span>
              </button>
              <button class="button is-warning" style="height: 2.4em;"
                      @click="onPermit(model.sysRoleId)">
                <b-icon icon="account-key"></b-icon>
                <span>授权</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column border-1  ml-2" v-show="addRole">
        <div class="menus_box">
          <jcc-field label="名称" horizontal class="required-field"
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'" data-vv-as="名称"></b-input>
          </jcc-field>
          <jcc-field label="角色编码" horizontal class="required-field"
                     :type="errors.has('roleCode') ? 'is-danger' : ''"
                     :message="errors.first('roleCode')">
            <b-input name="roleCode" v-model="model.roleCode"
                     v-validate="'required|max:64|alpha_underscore'" data-vv-as="角色编码"></b-input>
          </jcc-field>
          <jcc-field label="排序" horizontal class="required-field"
                     :message="errors.first('sorted')"
                     :type="errors.has('sorted') ? 'is-danger' : ''">
            <b-input name="sorted" expanded v-model="model.sorted"
                     v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序"
                     class="w-25">
            </b-input>
          </jcc-field>
          <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control">
              <button class="button is-primary" @click="save"
                      :class="{'is-loading' : saving}">
                <b-icon icon="check-circle"></b-icon>
                <span>保存</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column  ml-2 is-size-7 border-1" v-show="rolePermit">
        <span class="is-size-6">设置角色对应的功能权限</span>
        <span class="ml-5">
        <button class="button is-primary is-small" @click="savePermit"
                :class="{'is-loading' : saving}">
          <b-icon icon="check-circle"></b-icon>
          <span>保存授权</span>
        </button>
        </span>
        <vue-tree v-model="permitTreeOptions.checkedIds" :tree-data="permitTreeData" :options="permitTreeOptions"
                  @handle="menuClick"></vue-tree>
      </div>
      <div class="column" v-show="rolePermit">
        <div v-show="curPermissions && curPermissions.length > 0">
          <b-table
            :data="curPermissions"
            :checked-rows.sync="checkedPermissions"
            checkable>
            <template slot-scope="props">
              <b-table-column field="name" label="权限" width="40">
                {{ props.row.name }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import {
    roleTree,
    getRole,
    addRole,
    deleteRole,
    updateRole,
    getSystem,
    getPermitted,
    permit
  } from '@/api/sys/role'
  import {deleteConfirm, successToast} from '@/utils/dialog'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
//        subsystemId: this.$route.params.id,
        checkAll: false,
        allPermssions: [],
        deleting: false,
        permitModel: {
          permissions: []
        },
        model: {},
        saving: false,
        addRole: false,
        viewRole: false,
        rolePermit: false,
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
        },
        // 功能权限
        curMenu: '',
        firstCreated: 0,
        allPermissions: [],
        checkedPermissions: [],
        permitTreeData: [],
        permitTreeOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          checkedIds: [],
          label: 'name',
          depthOpen: 3,
          checkbox: true,
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
      removeArray (array, element) {
        const index = array.indexOf(element)
        if (index !== -1) {
          array.splice(index, 1)
        }
      },
      onAdd (id) {
        this.addRole = true
        this.viewRole = false
        this.model = {parentId: id}
      },
      itemClick (item) {
        const id = item.id
        if (id === -1) {
          this.addRole = true
          this.viewRole = false
          this.rolePermit = false
          this.model = {parentId: id}
        } else {
          this.viewRole = true
          this.addRole = false
          this.rolePermit = false
          getRole(id).then(response => {
            this.model = response.data
          })
        }
      },
      menuClick (item) {
        this.curMenu = item.sysPermissionId
      },
      onEdit (id) {
        this.addRole = true
        this.viewRole = false
        this.rolePermit = false
      },
      savePermit (id) {
        const vm = this
        vm.saving = true
        // 删除掉子系统、根目录
        let savedPermissions = this.permitTreeOptions.checkedIds.filter(function (item) {
          if (typeof item === 'string') {
            return false
          }
          if (item === -1) {
            return false
          }
          return true
        })
        this.checkedPermissions.forEach(function (item) {
          savedPermissions.push(item.sysPermissionId)
        })
        const permitModel = {
          roleId: this.model.sysRoleId,
          permissions: savedPermissions
        }
        permit(permitModel).then(response => {
          vm.saving = false
          successToast(vm)
//          vm.loadAsyncData()
        }).catch(err => {
          vm.saving = false
        })
      },
      onPermit (id) {
        this.addRole = false
        this.viewRole = false
        this.rolePermit = true
        const vm = this
        vm.permitTreeOptions.checkedIds = []
        vm.permitTreeData = []
        vm.allPermissions = []
        // 因为要获取checkedPermissions，应该在两个请求都完成后计算，没有使用axios.all
        getPermitted(id).then(response2 => {
          const checkedIds = response2.data.permissions
          getSystem(id).then(response => {
            const treeData = response.data
            // 重新修改树节点，将最后的子菜单放在右边
            treeData.forEach(function (item) {
              item.id = 's-' + item.id
              if (item.permissions) {
                item.permissions.forEach(function (perm) {
                  vm.allPermissions.push(perm)
                })
              }
            })
            vm.permitTreeData = [ {
              id: -1,
              name: '根目录',
              children: treeData
            }]
            // 删除是右侧权限的ID
            vm.permitTreeOptions.checkedIds = checkedIds.filter(function (item) {
              return vm.allPermissions.filter(function (perm) {
                return perm.sysPermissionId === item
              }).length === 0
            })
            vm.checkedPermissions = vm.allPermissions.filter(function (item) {
              return checkedIds.filter(function (checkedId) {
                return checkedId === item.sysPermissionId
              }).length > 0
            })
          })
        })
      },
      onDelete (id) {
        const vm = this
        deleteConfirm(vm, () => {
          vm.deleting = true
          deleteRole(id).then(response => {
            vm.deleting = false
            successToast(vm)
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
            if (vm.model.sysRoleId) {
              updateRole(vm.model.sysRoleId, vm.model).then(response => {
                vm.saving = false
                successToast(vm)
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addRole(vm.model).then(response => {
                vm.saving = false
                successToast(vm)
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
        this.addRole = false
        this.viewRole = false
        roleTree().then(response => {
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
    },
    computed: {
      curPermissions () {
        const vm = this
        return this.allPermissions.filter(function (item) {
          return item.parentId === vm.curMenu
        })
      },
      checkedPermitTree () {
        let temp = [...this.permitTreeOptions.checkedIds]
        return temp
      },
      removeArray (arr, obj) {
        let length = arr.length
        for (let i = 0; i < length; i++) {
          if (arr[i] === obj) {
            if (i === 0) {
              arr.shift()
              return arr
            } else if (i === length - 1) {
              arr.pop()
              return arr
            } else {
              arr.splice(i, 1)
              return arr
            }
          }
        }
      }
    },
    watch: {
      // 可以使用deep监听详细属性，也可以使用computed做中间层
      checkedPermitTree (newValue, oldValue) {
        // 现在没有办法获取check事件，同时又没办法区分首次加载，所以用了个很傻的计数o(╥﹏╥)o
        if (this.firstCreated < 3) {
          this.firstCreated = this.firstCreated + 1
          return
        }
        const vm = this
        // 判断是选中还是取消
        const deleted = oldValue.filter(function (item) {
          return newValue.indexOf(item) < 0
        })
        const added = newValue.filter(function (item) {
          return oldValue.indexOf(item) < 0
        })
        // 如果是新增，它的权限全选中，如果是删除，它的权限全删除
        vm.allPermissions.filter(function (item) {
          return added.filter(function (add) {
            return add === item.parentId
          }).length > 0
        }).forEach(function (item) {
          vm.checkedPermissions.push(item)
        })
        vm.checkedPermissions = vm.checkedPermissions.filter(function (item) {
          return deleted.indexOf(item.parentId) < 0
        })
      }
    }
  }
</script>
