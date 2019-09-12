<template>
  <section>
    <ul class="page-nav page-nav-material">
    </ul>
    <div class="columns is-fixed-full-content mt-1">
      <div
          class="column is-one-fifth bg-blue-grey-50 page-content-part is-paddingless">
        <b-loading :is-full-page="isFullPage" :active.sync="isRoleLoading"></b-loading>
        <tree :data="treeData" :options="opts" ref="tree">
          <span class="tree-text" slot-scope="{ node }" ref="tree">
              <template v-if="!node.hasChildren()">
                <i class="mdi mdi-star"></i>
                {{ node.text }}
              </template>

              <template v-else>
                <i :class="[node.expanded() ? 'mdi mdi-folder-open' : 'mdi mdi-folder']"></i>
                {{ node.text }}
              </template>
            </span>
        </tree>
      </div>
      <div class="column is-two-fifth bg-blue-grey-50 page-content-part is-paddingless"
           v-show="addRole">
        <nav class="level bg-white p-2 m-1">
          <div class="level-left">
            <div class="level-item">
              <p class="control ml-1">
                <button class="button m-1" @click="onAdd(-1)">
                  <span>新增角色</span>
                </button>
              </p>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-two-fifth bg-blue-grey-50 page-content-part is-paddingless"
           v-show="viewRole">
        <b-loading :is-full-page="isFullPage" :active.sync="ifViewLoading"></b-loading>
        <nav class="level bg-white p-2 m-1">
          <div class="level-left">
            <div class="level-item">
              <p class="control">
                <button class="button m-1" @click="onAdd(model.roleId)"
                        :disabled="!model.roleId || deleting">
                  <span>新增子角色</span>
                </button>
                <button class="button m-1" @click="onEdit(model.roleId)"
                        :disabled="!model.roleId || deleting">
                  <span>修改角色</span>
                </button>
                <button class="button m-1 is-danger"
                        @click="onDelete(model.roleId)"
                        :class="{'is-loading' : deleting}" :disabled="!model.roleId">
                  <span>删除</span>
                </button>
                <button class="button m-1"
                        @click="onPermit(model.roleId)" :disabled="!model.roleId || deleting">
                  <span>授权</span>
                </button>
              </p>
            </div>
          </div>
        </nav>
        <div class="">
          <b-field label="名称" horizontal class="static-field">
            <p class="control static-field">{{model.name}}</p>
          </b-field>
          <b-field label="类型" horizontal class="static-field">
            <p class="control static-field">{{ $dictText('roleType',model.type) }}</p>
          </b-field>
          <b-field label="排序" horizontal class="static-field">
            <p class="control">{{model.sorted}}</p>
          </b-field>
          <b-field label="数据角色" horizontal class="static-field">
            <p class="control">
            <span class="tag is-info">
              {{ $boolText(model.dataRole) }}
              </span>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import AddForm from '@/views/backend/role/add.vue'
  import EditForm from '@/views/backend/role/edit.vue'
  import PermitForm from '@/views/backend/role/permit.vue'
  import {deleteRole, getRole, roleTree} from '@/api/user/role'

  const eventsList = [
    {name: 'node:clicked', args: ['Node']},
  ]

  function getData() {
    return new Promise(resolve => {
      roleTree().then(response => {
        const data = {
          id: -1,
          name: '角色列表',
          children: [],
          state: {expanded: true}
        }
        if (response.data && response.data.length > 0) {
          data.children = response.data
        }
        resolve([data])
      })
    })
  }

  export default {
    data() {
      return {
        tree: undefined,
        isFullPage: false,
        isRoleLoading: false,
        ifViewLoading: false,
        deleting: false,
        permitModel: {
          permissions: []
        },
        model: {},
        addRole: false,
        viewRole: false,
        // tree数据
        selectedNode: undefined,
        treeData: getData(),
        opts: {
          propertyNames: {
            text: 'name'
          }
        }
      }
    },
    methods: {
      onAdd(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增角色',
          width: '30rem',
          component: AddForm,
          props: {
            parentId: id
          },
          onClose: () => {
            vm.refresh()
          }
        })
      },
      itemClick(item) {
        this.selectedNode = item
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
      onEdit(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改角色',
          width: '30rem',
          component: EditForm,
          props: {
            "roleId": id
          },
          onClose: () => {
            vm.refresh()
            vm.itemClick(vm.selectedNode)
          }
        })
      },
      onPermit(id) {
        this.$formModal.open({
          parent: this,
          name: '角色授权',
          width: '60rem',
          component: PermitForm,
          props: {
            "roleId": id
          },
          onClose: () => {
          }
        })
      },
      onDelete(id) {
        const vm = this
        vm.$deleteConfirm(() => {
          vm.deleting = true
          deleteRole(id).then(response => {
            vm.deleting = false
            vm.$successToast()
            vm.removeNode(vm.selectedNode)
            vm.selectedNode = undefined
            vm.addRole = true
            vm.viewRole = false
          }).catch(err => {
            vm.deleting = false
          })
        })
      },
      removeNode(node) {
        node.remove()
      },
      addChildNode(node, child) {
        if (node.enabled()) {
          node.append(child)
        }
      },
      refresh() {
        const vm = this
        roleTree().then(response => {
          const data = {
            id: -1,
            name: '角色列表',
            children: [],
            state: {expanded: true}
          }
          if (response.data && response.data.length > 0) {
            data.children = response.data
          }
          vm.tree.setModel([data])
        })
      },
      loadAsyncData() {
        return new Promise(resolve => {
          roleTree().then(response => {
            const data = {
              id: -1,
              name: '角色列表',
              children: [],
              state: {expanded: true}
            }
            if (response.data && response.data.length > 0) {
              data.children = response.data
            }
            resolve([data])
          })
        })
      },
      initEventViewer(event) {
        const vm = this
        if (event.name == 'node:clicked') {
          return function (node, newNode) {
            vm.itemClick(node)
          }
        }

        return function (node, newNode) {
          // console.log(event, arguments)
        }
      }
    },
    mounted() {
      this.tree = this.$refs.tree
      eventsList.forEach(e => {
        this.$refs.tree.$on(e.name, this.initEventViewer(e))
      })
    },
    created() {
      this.loadAsyncData()
    }
  }
</script>
