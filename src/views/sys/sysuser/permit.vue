<template>
  <section>
    <div class="form-modal-card-body">
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
    <div class="form-modal-card-footer">
      <button class="button is-primary" @click="save"
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
  import {getAvailableRole, getPermitted, savePermit} from '@/api/sys/sysuser';
  export default {
    data() {
      return {
        checkedRoles: [],
        model: {},
        availableRoles: [],
        loading: true,
        saving: false
      };
    },
    methods: {
      save() {
        const vm = this
        vm.saving = true
        vm.model.roles = vm.checkedRoles.map(function (item) {
          return item.sysRoleId
        })
        vm.$saveModel(savePermit, resp => {
          vm.$parent.succeed('用户授权成功', resp)
        }, err => {
          vm.$parent.fail('用户授权失败', err)
        })
      },
      loadAsyncData() {
        const vm = this
        vm.loading = true
        getAvailableRole().then(response => {
          vm.availableRoles = response.data
          getPermitted(vm.model.sysUserId).then(response2 => {
            vm.loading = false
            let roleIdList = response2.data.map(function (item) {
              return item.sysRoleId
            })
            vm.checkedRoles = vm.availableRoles.filter(function (item) {
              return vm.$arrayContains(roleIdList, item.sysRoleId)
            })
          }).catch(err => {
            vm.loading = false
          })
        })
      }
    },
    created() {
      this.model.sysUserId = this.$parent.$props.props.sysUserId
      this.loadAsyncData()
    }
  }
</script>
