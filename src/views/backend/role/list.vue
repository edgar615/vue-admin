<template>
  <section>
    <div class="columns is-full-content">
      <div class="column is-one-fifth">
        <div class="card box-content1 notification is-primary" data-simplebar>
          <div class="card-content">
            <b-loading :is-full-page="isFullPage" :active.sync="isRoleLoading"></b-loading>
            <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                      @handle="itemClick"></vue-tree>
          </div>
        </div>
      </div>
      <div class="column ml-2" v-show="addRole">
        <div class="card box-content1">
          <header class="card-header">
            <div class="card-header-title">
              <div class="ml-3 buttons">
                <button class="button m-1" @click="onAdd(-1)">
                  <span>新增角色</span>
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div class="column ml-2" v-show="viewRole">
        <div class="card box-content1">
          <b-loading :is-full-page="isFullPage" :active.sync="ifViewLoading"></b-loading>
          <header class="card-header">
            <div class="card-header-title">
              <div class="ml-3 buttons">
                <button class="button m-1" @click="onAdd(model.sysRoleId)" :disabled="!model.sysRoleId || deleting">
                  <span>新增子角色</span>
                </button>
                <button class="button m-1" @click="onEdit(model.sysRoleId)" :disabled="!model.sysRoleId || deleting">
                  <span>修改角色</span>
                </button>
                <button class="button m-1 is-danger"
                        @click="onDelete(model.sysRoleId)"
                        :class="{'is-loading' : deleting}" :disabled="!model.sysRoleId">
                  <span>删除</span>
                </button>
                <button class="button m-1"
                        @click="onPermit(model.sysRoleId)" :disabled="!model.sysRoleId || deleting">
                  <span>授权</span>
                </button>
              </div>
            </div>
          </header>
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
  import AddForm from '@/views/backend/role/add.vue'
  import EditForm from '@/views/backend/role/edit.vue'
  import PermitForm from '@/views/backend/role/permit.vue'
  import {
    roleTree,
    getRole,
    deleteRole
  } from '@/api/sys/role'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
//        subsystemId: this.$route.params.id,
        isFullPage: false,
        isRoleLoading: true,
        ifViewLoading: false,
        deleting: false,
        permitModel: {
          permissions: []
        },
        model: {},
        addRole: false,
        viewRole: false,
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
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增角色',
          width: '30rem',
          component: AddForm,
          props: {
            parentId: id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      itemClick (item) {
        const id = item.id
        if (id === -1) {
          this.addRole = true
          this.viewRole = false
          this.model = {parentId: id}
        } else {
          this.viewRole = true
          this.addRole = false
          this.model = {}
          this.ifViewLoading = true
          getRole(id).then(response => {
            this.model = response.data
            this.ifViewLoading = false
          })
        }
      },
      onEdit (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改角色',
          width: '30rem',
          component: EditForm,
          props: {
            "sysRoleId": id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      onPermit (id) {
        this.$formModal.open({
          parent: this,
          name: '角色授权',
          width: '60rem',
          component: PermitForm,
          props: {
            "sysRoleId": id
          },
          onClose: () => { }
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
      loadAsyncData () {
        const vm = this
        vm.isRoleLoading = true
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
          vm.isRoleLoading = false
        })
      }
    },
    created () {
      this.loadAsyncData()
    }
  }
</script>
