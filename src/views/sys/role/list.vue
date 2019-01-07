<template>
  <section class="ml-2 mt-3">
    <div class="columns">
      <div class="column is-one-fifth  is-size-7 vue-tree directory-wrap">
        <vue-tree :tree-data="treeData" :options="options"
                  @handle="itemClick" style="height: 500px;overflow-y: auto"></vue-tree>
      </div>
      <div class="column ml-2" v-show="viewRole">
        <div class="menus_box viewrole-wrap">
          <b-field label="名称" horizontal class="static-field">
            <p class="control static-field">{{model.name}}</p>
          </b-field>
          <b-field label="角色编码" horizontal class="static-field">
            <p class="control static-field">{{model.roleCode}}</p>
          </b-field>
          <b-field label="排序" horizontal class="static-field">
            <p class="control">{{model.sorted}}</p>
          </b-field>
          <b-field v-if="model.sysRoleId"><!-- Label left empty for spacing -->
            <p class="control"
               style="padding-left: 100px; margin-top: 50px;">
              <button class="role-button" @click="onAdd(model.sysRoleId)">
                <span>新增角色</span>
              </button>
              <button class="role-button" @click="onEdit">
                <span>修改角色</span>
              </button>
              <button class="role-button" style="background-color: crimson;"
                      @click="onDelete(model.sysRoleId)"
                      :class="{'is-loading' : deleting}">
                <span>删除</span>
              </button>
              <button class="role-button"
                      @click="onPermit(model.sysRoleId)">
                <span>授权</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column ml-2" v-show="addRole">
        <div class="menus_box viewrole-wrap">
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
              <button class="button is-primary submit" @click="save"
                      :class="{'is-loading' : saving}" style="width: 110px;font-size: 14px;height: 28px;margin: 20px 0;line-height: 18px;">
                <span>保存</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column  ml-2 is-size-7 install-wrap" v-show="rolePermit">
        <span class="is-size-6" style="font-weight: 600;font-size: 14px!important;">设置角色对应的功能权限</span>
        <span class="ml-5">

        </span>

        <vue-tree v-model="permitTreeOptions.checkedIds" :tree-data="permitTreeData" :options="permitTreeOptions"
                  @handle="menuClick" style="height: 500px;overflow-y: auto"></vue-tree>
        <p style="text-align: center;width: 100%;margin-top: 20px;">
          <button class="button is-primary is-small submit" @click="savePermit"
                  :class="{'is-loading' : saving}" style="width: 110px;">
            保存授权
          </button>
        </p>
      </div>
      <div class="column three-wrap" v-show="rolePermit">
        <div v-show="curPermissions && curPermissions.length > 0">
          <b-table
            :data="curPermissions"
            :checked-rows.sync="checkedPermissions"
            checkable>
            <template slot-scope="props">
              <b-table-column field="name" label="权限" width="400">
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
          this.model = {}
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
        // 现在下面这行已经没用了，因为服务端按string传递LONG，之后，永远都是string
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
        vm.firstCreated = 0
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
              return vm.contains(checkedIds, item.sysPermissionId)
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
      contains (array, obj) {
        let i = array.length
        while (i--) {
          if (array[i] === obj) {
            return true
          }
        }
        return false
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
    mounted () {
      this.firstCreated = 0
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
<style scoped>
  .directory-wrap.vue-tree{
    background-color: white!important;
    margin: 0 20px;
  }

  .role-button{
    width: 110px;
    height: 28px;
    line-height: 28px;
    background-color: #ff6600;
    color: white;
    text-align: center;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
  }

  .install-wrap{
    background-color: white;
    padding: 20px;
    padding-top: 5px;
  }
  .menus_box.viewrole-wrap{
    margin: 0;
    padding: 20px;
  }
  .menus_box.viewrole-wrap .control{
    max-width: 600px!important;
  }
  /*第三层权限管理*/
  .column.three-wrap{
    margin: 0 20px;
  }
</style>
