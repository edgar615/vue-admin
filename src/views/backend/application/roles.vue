<template>
  <section>
    <div class="form-modal-card-body">
      <b-table
          narrowed
          mobile-cards
          :loading="loading"
          :data="roles.length == 0 ? [] : roles"
      >
        <template slot="empty">
          <EmptyTable></EmptyTable>
        </template>
        <template slot-scope="props">

          <b-table-column field="name" label="角色">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="name" label="允许访问?">
            <b-switch v-if="forceRefresh" v-model="props.row.whitelist"
                      @click.native="toggleWhitelist(props.row)">
              {{ props.row.whitelist ? "允许" : "禁止" }}
            </b-switch>
          </b-table-column>

        </template>
      </b-table>
    </div>
  </section>
</template>
<script>
  import axios from 'axios'
  import {getAvailableRole, getWhitlist, addRole, deleteRole} from '@/api/backend/application'

  export default {
    data () {
      return {
        forceRefresh: true,
        loading: false,
        saving: false,
        roles: []
      }
    },
    methods: {
      toggleWhitelist(role) {
        const vm = this
        if (role.whitelist) {
          deleteRole(this.$parent.$props.props.applicationId, role.sysRoleId).then(response => {
            vm.loadAsyncData()
          })
        } else {
          addRole(this.$parent.$props.props.applicationId, role.sysRoleId).then(response => {
            vm.loadAsyncData()
          })
        }

      },
      loadAsyncData() {
        this.$parent.startLoading()
        const vm = this
        vm.forceRefresh = false
        axios.all([getAvailableRole(), getWhitlist(this.$parent.$props.props.applicationId)])
        .then(axios.spread(function (roles, whiltelist) {
          vm.roles = roles.data
          vm.roles.forEach(function(item) {
            let whitelist = whiltelist.data.filter(function(role) {
              return role.sysRoleId == item.sysRoleId
            }).length > 0
            item.whitelist = whitelist
          })
          vm.$parent.closeLoading()
          vm.$nextTick(() => {
            vm.forceRefresh = true
          })
        })).catch(err => {
          vm.$parent.closeLoading()
          vm.$parent.fail('查询失败', err)
        })
      }
    },
    created () {
      this.$parent.startLoading()
      const vm = this
      axios.all([getAvailableRole(), getWhitlist(this.$parent.$props.props.applicationId)])
      .then(axios.spread(function (roles, whiltelist) {
        vm.roles = roles.data
        vm.roles.forEach(function(item) {
          let whitelist = whiltelist.data.filter(function(role) {
            return role.sysRoleId == item.sysRoleId
          }).length > 0
          console.log(whitelist)
          item.whitelist = whitelist
        })
        vm.$parent.closeLoading()
      })).catch(err => {
        vm.$parent.closeLoading()
        vm.$parent.fail('查询失败', err)
        })
      // this.$getModel(getApplication, this.$parent.$props.props.applicationId)
      // .then(respone => {
      //   this.$parent.closeLoading()
      // }).catch(err => {
      //   this.$parent.closeLoading()
      //   this.$parent.fail('应用查询失败', err)
      // })
    }
  }
</script>
<style>

</style>
