<template>
  <section>
    <div class="form-modal-card-body">
      <div class="columns is-full-content">
        <div class="column">
          <div class="card box-content1">
            <header class="card-header">
              <div class="card-header-title">
                用户可以设置的角色
              </div>
            </header>
            <div class="card-content">
              <vue-tree :tree-data="permitTreeData" :options="permitOptions"
                        @handle="savePermit"></vue-tree>
            </div>
          </div>
        </div>

        <div class="column ml-2">
          <div class="card box-content1">
            <header class="card-header">
              <div class="card-header-title">
                用户拥有的角色
              </div>
            </header>
            <div class="card-content">
              <b-table
                  narrowed
                  mobile-cards
                  :loading="loading"
                  :data="roles.length == 0 ? [] : roles"
              >
                <template slot-scope="props" slot="header">
                  <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                    {{ props.column.label }}
                  </b-tooltip>
                </template>
                <template slot="empty">
                  <EmptyTable></EmptyTable>
                </template>
                <template slot-scope="props">

                  <b-table-column label="角色">
                    {{ props.row.name }}
                  </b-table-column>

                  <b-table-column label="删除">
                    <a @click="deletePermit(props.row.sysRoleId)">
                      删除
                    </a>
                  </b-table-column>
                </template>
              </b-table>
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
</style>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import EmptyTable from '@/components/EmptyTable.vue'
  import {addRole, deleteRole, getAvailableRole, getPermitted} from '@/api/sys/sysuser';

  export default {
    components: {
      VueTree, EmptyTable
    },
    data() {
      return {
        model: {},
        roles: [],
        loading: true,
        // tree数据
        permitTreeData: [],
        // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
        permitCheckedIds: [],
        // 设置项
        permitOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          label: 'name',
          depthOpen: 10,
//          idsWithParent: false,
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
        columns: [
          {
            field: 'name',
            label: '角色名称'
          },
          {
            field: 'op',
            label: '操作',
            meta: ''
          }
        ]
      };
    },
    methods: {
      savePermit (item) {
        const vm = this
        const roleId = item.id
        vm.$opConfirm('确定要授予这个角色吗?', () => {
          vm.deleting = true
          addRole(this.sysUserId, roleId).then(response => {
            vm.loadPermitted()
          })
        })
      },
      deletePermit (roleId) {
        const vm = this
        vm.$opConfirm('确定要取消这个角色吗?', () => {
          vm.deleting = true
          deleteRole(this.sysUserId, roleId).then(response => {
            vm.loadPermitted();
          })
        })
      },
      loadPermitted () {
        const vm = this
        vm.loading = true
        getPermitted(this.sysUserId).then(response => {
          vm.loading = false
          vm.roles = response.data
        }).catch(err => {
          vm.loading = false
        })
      },
      loadAsyncData() {
        const vm = this
        getAvailableRole().then(response => {
          const vm = this
          vm.permitTreeData = response.data
        })
        this.loadPermitted()
      }
    },
    created() {
      this.sysUserId = this.$parent.$props.props.sysUserId
      this.loadAsyncData()
    }
  }
</script>
