<template>
  <section>
    <div class="columns is-full-content">
      <div class="column is-one-fifth">
        <div class="card box-content1">
          <div class="card-content">
            <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                      @handle="itemClick"></vue-tree>
          </div>
        </div>
      </div>
      <div class="column ml-2" v-show="viewRole">
        <div class="card box-content1">
          <div class="card-content">
            <b-field label="名称" horizontal class="static-field">
              <p class="control static-field">{{model.name}}</p>
            </b-field>
            <b-field label="角色编码" horizontal class="static-field">
              <p class="control static-field">{{model.roleCode}}</p>
            </b-field>
            <b-field label="排序" horizontal class="static-field">
              <p class="control">{{model.sorted}}</p>
            </b-field>
            <b-field v-if="model.sysRoleId" horizontal>
              <p class="control">
                <button class="button m-1" @click="onAdd(model.sysRoleId)">
                  <span>新增角色</span>
                </button>
                <button class="button m-1" @click="onEdit">
                  <span>修改角色</span>
                </button>
                <button class="button m-1" style="background-color: crimson;"
                        @click="onDelete(model.sysRoleId)"
                        :class="{'is-loading' : deleting}">
                  <span>删除</span>
                </button>
                <button class="button m-1"
                        @click="onPermit(model.sysRoleId)">
                  <span>授权</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>

      <div class="column  ml-2" v-show="rolePermit">
        <div class="card">
          <header class="card-header">
            <div class="card-header-right buttons">
              <button class="button is-primary" @click="savePermit"
                      :class="{'is-loading' : saving}">
                保存授权
              </button>
            </div>
          </header>
        </div>
        <div class="columns mt-2">
          <div class="column">
            <div class="card box-content2">
              <header class="card-header">
                <div class="card-header-title">
                  设置角色对应的菜单权限
                </div>
              </header>
              <div class="card-content">
                <vue-tree v-model="permitTreeOptions.checkedIds" :tree-data="permitTreeData" :options="permitTreeOptions"
                          @handle="menuClick"></vue-tree>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card box-content2" v-show="curPermissions && curPermissions.length > 0">
              <header class="card-header">
                <div class="card-header-title">
                  设置角色对应的功能权限
                </div>
              </header>
              <div class="card-content">
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
        </div>
      </div>

    </div>
  </section>
</template>
<style scoped>
  .box-content1 {
    height: 600px;
    overflow: auto;
  }

  .box-content2 {
    height: 540px;
    overflow: auto;
  }
</style>
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
          vm.$successToast()
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
              name: '角色列表',
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
        vm.$deleteConfirm(() => {
          vm.deleting = true
          deleteRole(id).then(response => {
            vm.deleting = false
            vm.$successToast()
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
                vm.$successToast()
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addRole(vm.model).then(response => {
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
        this.addRole = false
        this.viewRole = false
        roleTree().then(response => {
          const data = {
            id: -1,
            name: '角色列表',
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
