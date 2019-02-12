<template>
  <section>
    <div class="form-modal-card-body">
      {{checkedRoles}}
      <b-table
          narrowed
          mobile-cards
          :loading="loading"
          :data="availableRoles.length == 0 ? [] : availableRoles"
          checkable
          :checked-rows.sync="checkedRoles"
      >
        <template slot="empty">
          <EmptyTable></EmptyTable>
        </template>
        <template slot-scope="props">

          <b-table-column field="name" label="角色">
            {{ props.row.name }}
          </b-table-column>

        </template>
      </b-table>
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
  import EmptyTable from '@/components/EmptyTable.vue'
  import {addRole, deleteRole, getAvailableRole, getPermitted} from '@/api/sys/sysuser';

  export default {
    components: {
      EmptyTable
    },
    data() {
      return {
        model: {},
        checkedRoles: [],
        availableRoles: [],
        loading: true
      };
    },
    methods: {
      savePermit (roleId) {
        const vm = this
        vm.$opConfirm('确定要授予这个角色吗?', () => {
          vm.deleting = true
          addRole(this.sysUserId, roleId).then(response => {
            vm.loadPermitted()
          })
        })
      },
      loadAsyncData() {
        const vm = this
        vm.loading = true
        getAvailableRole().then(response => {
          vm.availableRoles = response.data
          getPermitted(this.sysUserId).then(response2 => {
            vm.loading = false
            let roleIdList = response2.data.map(function (item) {
              return item.sysRoleId
            })
            console.log(roleIdList)
            vm.checkedRoles = vm.availableRoles.filter(function (item) {
              return vm.$arrayContains(roleIdList, item.sysRoleId)
            })
          }).catch(err => {
            vm.loading = false
          })
        }).catch(err => {
          vm.loading = false
        })
      }
    },
    created() {
      this.sysUserId = this.$parent.$props.props.sysUserId
      this.loadAsyncData()
    }
  }
</script>
