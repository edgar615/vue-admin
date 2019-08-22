<template>
  <section>
    <ul class="page-nav page-nav-material">
    </ul>
      <div class="columns is-fixed-full-content mt-1">
        <div class="column is-offset-one-fifth is-one-fifth bg-blue-grey-50 page-content-part is-paddingless">
          <div class="notification is-white no-radius is-marginless">
            <p class="title is-size-6 has-text-dark">系统列表</p>
          </div>
          <nav class="level bg-white p-2 m-b-1">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <b-input rounded v-model="filters.name" placeholder="系统名称"></b-input>
              </div>
              <div class="level-item">
                <p class="control ml-1">
                  <button class="button" @click="restartLoad">
                    <b-icon icon="magnify"></b-icon>
                    <span>查询</span>
                  </button>
                </p>
              </div>
            </div>
          </nav>
          <div class="has-text-centered m-b-1">
            <a class="has-text-grey" @click="addModal">点击添加系统</a>
          </div>
          <ul class="list-unstyled ml-2 mr-2">
            <li class="mb-2" :key="system.subsystemId" v-for="system in systems" @click="loadMenus(system.subsystemId)">
              <div class="card p-3" style="height: 130px;">
                <div>
                  <div class="ml-2">
                    <p>
                      <b-icon :icon="system.icon" class="has-text-primary"></b-icon> <strong>{{system.name}}</strong>
                    </p>
                    <p>
                      <small>{{system.sysIdentifier}}</small>
                    </p>
                    <p>
                      <small class="has-text-primary">排序: {{system.sorted}}</small>
                    </p>
                    <div class="tags">
                      <span class="tag is-primary">{{ $dictText('systemType',system.type) }}</span>
                      <span class="tag is-success">{{ $customBoolText(system.internal, '仅维护人员访问', '外部用户') }}</span>
                    </div>
                  </div>

                  <div class="is-pulled-right">
                    <div class="v-center" style="right: 1rem;">
                      <div class="mb-2">
                        <a class="button is-outlined is-small" @click="editModal(system.subsystemId)">
                          <b-icon icon="pencil"></b-icon>
                        </a>
                      </div>
                      <div>
                        <a class="button is-outlined is-danger is-small" @click="onDelete(system.subsystemId)">
                          <b-icon icon="delete"></b-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="has-text-centered">
            <a class="has-text-grey" @click="loadAsyncData"  v-if="!noData">点击获取更多</a>
            <a class="has-text-grey" @click="loadAsyncData" v-else>没有更多了</a>
          </div>
        </div>
        <div class="column is-one-fifth bg-blue-grey-50 page-content-part is-paddingless">
          <div class="notification is-white no-radius is-marginless">
            <p class="title is-size-6 has-text-dark">一级菜单</p>
          </div>
          <div class="has-text-centered">
            <a class="has-text-grey" @click="addMenu(systemId, -1)" v-show="systemId">点击添加菜单</a>
          </div>

          <ul class="list-unstyled mt-2 ml-2 mr-2">
            <li class="mb-2" :key="menu.sysPermissionId" v-for="menu in level1List" @click="loadLevel2(menu.sysPermissionId)">
              <div class="card p-3" style="height: 140px;">
                <div>
                  <div class="ml-2">
                    <p>
                      <strong>{{menu.name}}</strong>
                    </p>
                    <p v-show="menu.path">
                      <small>路径: {{menu.path}}</small>
                    </p>
                    <p v-show="menu.permission">
                      <small>权限值: {{menu.permission}}</small>
                    </p>
                    <p>
                      <small class="has-text-primary">排序: {{menu.sorted}}</small>
                    </p>
                    <div class="tags">
                      <span class="tag is-primary">{{ $dictText('systemType',menu.type) }}</span>
                      <span class="tag is-success">{{ $customBoolText(menu.internal, '仅维护人员访问', '外部用户') }}</span>
                    </div>
                  </div>
                  <div class="is-pulled-right">
                    <div class="v-center" style="right: 1rem;">
                      <div class="mb-2">
                        <a class="button is-outlined is-small" @click="editMenu(menu.sysPermissionId)">
                          <b-icon icon="pencil"></b-icon>
                        </a>
                      </div>
                      <div>
                        <a class="button is-outlined is-danger is-small" @click="onDeleteMenu(menu.sysPermissionId)">
                          <b-icon icon="delete"></b-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="column is-one-fifth bg-blue-grey-50 page-content-part is-paddingless">
          <div class="notification is-white no-radius is-marginless">
            <p class="title is-size-6 has-text-dark">二级菜单</p>
          </div>
          <div class="has-text-centered">
            <a class="has-text-grey" @click="addMenu(systemId, menuId)" v-show="menuId">点击添加菜单</a>
          </div>
          <ul class="list-unstyled mt-2 ml-2 mr-2">
            <li class="mb-2" :key="menu.sysPermissionId" v-for="menu in level2List">
              <div class="card p-3" style="height: 140px;">
                <div>
                  <div class="ml-2">
                    <p>
                      <strong>{{menu.name}}</strong>
                    </p>
                    <p v-show="menu.path">
                      <small>路径: {{menu.path}}</small>
                    </p>
                    <p v-show="menu.permission">
                      <small>权限值: {{menu.permission}}</small>
                    </p>
                    <p>
                      <small class="has-text-primary">排序: {{menu.sorted}}</small>
                    </p>
                    <div class="tags">
                      <span class="tag is-primary">{{ $dictText('systemType',menu.type) }}</span>
                      <span class="tag is-success">{{ $customBoolText(menu.internal, '仅维护人员访问', '外部用户') }}</span>
                    </div>
                  </div>
                  <div class="is-pulled-right">
                    <div class="v-center" style="right: 1rem;">
                      <div class="mb-2">
                        <a class="button is-outlined is-small" @click="editMenu(menu.sysPermissionId)">
                          <b-icon icon="pencil"></b-icon>
                        </a>
                      </div>
                      <div>
                        <a class="button is-outlined is-danger is-small" @click="onDeleteMenu(menu.sysPermissionId)">
                          <b-icon icon="delete"></b-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </section>
</template>

<script>
  import {deleteSystem, systemList, menuList, deleteMenu} from '@/api/backend/system'
  import AddForm from '@/views/backend/system/add.vue'
  import EditForm from '@/views/backend/system/edit.vue'
  import ViewForm from '@/views/backend/system/view.vue'
  import AddPermissionMenu from '@/views/backend/system/permission-add.vue'
  import EditPermissionMenu from '@/views/backend/system/permission-edit.vue'
  export default {
    data() {
      return {
        filters: {},
        pagination: {},
        systems: [],
        menus: [],
        systemId: undefined,
        menuId: undefined,
        limit: 4,
        noData: false,
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: []
      }
    },
    methods: {
      loadAsyncData(params) {
        const vm = this
        if (params == undefined) {
          params = {}
        }
        params.limit = vm.limit
        params.start = vm.systems.length
        this.$pageModel(systemList, params).then(data => {
          vm.systems = vm.systems.concat(data)
          if (data.length < vm.limit) {
            vm.noData = true
          }
        })
      },
      restartLoad() {
        this.systems = []
        this.noData = false
        this.systemId = undefined
        this.menuId = undefined
        this.menus = []
        this.loadAsyncData()
      },
      loadMenus (systemId) {
        const vm = this
        vm.systemId = systemId;
        menuList(systemId).then(response => {
          vm.menus = response.data
        })
      },
      loadLevel2 (permissionId) {
        this.menuId = permissionId;
      },
      onDelete(id) {
        const vm = this
        this.$deleteModel(deleteSystem, id,
            () => {
              let index = -1
              for (let i = 0; i < vm.systems.length; i++) {
                if (vm.systems[i].subsystemId === id) {
                  index = i
                }
              }
              vm.systems.splice(index, 1)
            })
      },
      onDeleteMenu (id) {
        const vm = this
        vm.$deleteConfirm(() => {
          deleteMenu(id).then(response => {
            vm.model = {subsystemId: vm.subsystemId}
            vm.$successToast()
            vm.loadMenus(vm.systemId)
          }).catch(err => {
          })
        })
      },
      addModal() {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增子系统',
          width: '30rem',
          component: AddForm,
          onClose: () => {
            vm.restartLoad()
          }
        })
      },
      viewModal(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看子系统',
          width: '30rem',
          component: ViewForm,
          props: {
            systemId: id
          },
          showClose: true,
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      },
      editModal(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改子系统',
          width: '30rem',
          component: EditForm,
          props: {
            systemId: id
          },
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      },
      addMenu(systemId, parentId) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增权限',
          width: '30rem',
          component: AddPermissionMenu,
          props: {
            systemId: systemId,
            parentId: parentId
          },
          onClose: () => {
            vm.loadMenus(systemId)
          }
        })
      },
      editMenu(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改权限',
          width: '30rem',
          component: EditPermissionMenu,
          props: {
            sysPermissionId: id
          },
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      }
    },
    computed: {
      level1List() {
        return this.menus.filter(function(menu) {
          return menu.level === 1
        })
      },
      level2List() {
        if (this.menuId) {
          const id = this.menuId
          return this.menus.filter(function(menu) {
            return menu.parentId === id
          })
        } else {
          return []
        }

      }
    },
    created() {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
