<template>
  <section>
    <div class="form-modal-card-body">
      <div class="columns is-full-content">
        <div class="column">
          <div class="card box-content1" data-simplebar>
            <header class="card-header">
              <div class="card-header-title">
                菜单权限
              </div>
            </header>
            <div class="card-content">
              <vue-tree v-model="permitOptions.checkedIds"  :tree-data="permitTreeData" :options="permitOptions"
                        @handle="menuClick"></vue-tree>
            </div>
          </div>
        </div>

        <div class="column ml-2">
          <div class="card box-content1" data-simplebar>
            <header class="card-header">
              <div class="card-header-title">
                功能权限
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

<style scoped>
  .box-content1 {
    height: 600px;
    overflow: auto;
  }
</style>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import {
    getSystem,
    getPermitted,
    permit
  } from '@/api/sys/role'

  export default {
    components: {
      VueTree
    },
    data() {
      return {
        roleId: this.$parent.$props.props.roleId,
        saving: false,
        curMenu: '',
        firstCreated: 0,
        allPermissions: [],
        checkedPermissions: [],
        // tree数据
        permitTreeData: [],
        permitOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          checkedIds: [],
          label: 'name',
          depthOpen: 3,
//          idsWithParent: false,
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
      };
    },
    methods: {
      contains (array, obj) {
        let i = array.length
        while (i--) {
          if (array[i] === obj) {
            return true
          }
        }
        return false
      },
      removeArray (array, element) {
        const index = array.indexOf(element)
        if (index !== -1) {
          array.splice(index, 1)
        }
      },
      menuClick (item) {
        this.curMenu = item.sysPermissionId
      },
      save () {
        const vm = this
        vm.saving = true
        // 删除掉子系统、根目录
        // 现在下面这行已经没用了，因为服务端按string传递LONG，之后，永远都是string
        let savedPermissions = this.permitOptions.checkedIds.filter(function (item) {
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
          roleId: this.roleId,
          permissions: savedPermissions
        }
        permit(permitModel).then(response => {
          vm.saving = false
          vm.$parent.succeed('授权成功', response)
        }).catch(err => {
          vm.saving = false
          vm.$parent.fail('授权失败', err)
        })
      },
      loadAsyncData() {
        this.$parent.startLoading()
        const vm = this
        const id = this.roleId
        vm.permitOptions.checkedIds = []
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
            vm.permitOptions.checkedIds = checkedIds.filter(function (item) {
              return vm.allPermissions.filter(function (perm) {
                return perm.sysPermissionId === item
              }).length === 0
            })
            vm.checkedPermissions = vm.allPermissions.filter(function (item) {
              return vm.contains(checkedIds, item.sysPermissionId)
            })
            this.$parent.closeLoading()
          }).catch(err => {
            this.$parent.closeLoading()
            this.$parent.fail('权限查询失败', err)
          })
        }).catch(err => {
          this.$parent.closeLoading()
          this.$parent.fail('权限查询失败', err)
        })

      }
    },
    created() {
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
        let temp = [...this.permitOptions.checkedIds]
        return temp
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
