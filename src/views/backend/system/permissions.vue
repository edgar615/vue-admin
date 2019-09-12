<template>
  <section>
    <ul class="page-nav page-nav-material">
    </ul>
    <div class="columns is-fixed-full-content mt-1">
      <div class="column is-one-fifth bg-blue-grey-50 page-content-part is-paddingless">
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
      <div class="column is-3 bg-blue-grey-50 page-content-part is-paddingless"
           v-show="viewMenu">
        <nav class="level bg-white p-2 m-1" v-if="model.sysPermissionId">
          <div class="level-left">
            <div class="level-item">
              <p class="control">
                <button class="button m-1" @click="onAdd(model.sysPermissionId)"
                        v-show="model.level < 3">
                  <b-icon icon="plus-circle-outline"></b-icon>
                  <span>新增权限</span>
                </button>
                <button class="button m-1" @click="onEdit">
                  <b-icon icon="circle-edit-outline"></b-icon>
                  <span>修改</span>
                </button>
                <button class="button m-1 is-danger" @click="onDelete(model.sysPermissionId)"
                        :class="{'is-loading' : deleting}">
                  <b-icon icon="delete-outline"></b-icon>
                  <span>删除</span>
                </button>
              </p>
            </div>
          </div>
        </nav>

        <div class="m-2">
          <b-field label="类型" class="static-field">
            <p class="control static-field">{{$dictText('permissionType', model.type)}}</p>
          </b-field>
          <b-field label="名称" class="static-field">
            <p class="control static-field">{{model.name}}</p>
          </b-field>
          <b-field label="权限值" class="static-field" v-show="model.type != 3">
            <p class="control">{{model.permission}}</p>
          </b-field>
          <b-field label="菜单路径" class="static-field" v-show="model.type == 1">
            <p class="control">{{model.path}}</p>
          </b-field>
          <b-field label="图标" class="static-field" v-show="model.type != 2">
            <p class="control">{{model.icon}}</p>
          </b-field>
          <b-field label="排序" class="static-field">
            <p class="control">{{model.sorted}}</p>
          </b-field>
          <b-field label="隐藏?" class="static-field" v-show="model.type == 1">
            <p class="control">{{model.hidden}}</p>
          </b-field>
          <b-field label="默认地址?" class="static-field" v-show="model.type == 1">
            <p class="control">{{model.acquiescent}}</p>
          </b-field>
          <b-field label="标题" class="static-field" v-show="model.type == 1">
            <p class="control">{{model.title}}</p>
          </b-field>
          <b-field label="描述" class="static-field" v-show="model.type == 1">
            <p class="control">{{model.description}}</p>
          </b-field>
        </div>
      </div>

      <div class="column is-3 bg-blue-grey-50 page-content-part is-paddingless"
           v-show="addMenu">
        <div class="m-2">
          <b-field label="类型" class="required-field"
                     :type="errors.has('type') ? 'is-danger' : ''"
                     :message="errors.first('type')">
            <b-select name="type" expanded v-model="model.type"
                      v-validate="'required'" data-vv-as="类型" class="w-25">
              <option
                  v-for="option in $dictList('permissionType')"
                  :value="option.dictValue"
                  :key="option.dictValue">
                {{ option.dictText }}
              </option>
            </b-select>
          </b-field>

          <b-field label="名称" class="required-field"
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
          </b-field>
          <b-field label="权限值"
                     :type="errors.has('permission') ? 'is-danger' : ''"
                     :message="errors.first('permission')"
                     v-show="model.type != 3">
            <b-input name="permission" v-model="model.permission"
                     v-validate="'max:64|alpha_symbol'" data-vv-as="权限值"></b-input>
          </b-field>
          <b-field label="菜单路径" class="required-field"
                     :type="errors.has('path') ? 'is-danger' : ''"
                     :message="errors.first('path')"
                     v-show="model.type == 1">
            <b-input name="path" v-model="model.path"
                     v-validate="model.type == 1 ? 'required|max:64|menu' : '' "
                     data-vv-as="菜单路径"></b-input>
          </b-field>
          <b-field label="图标" class="required-field"
                     :type="errors.has('icon') ? 'is-danger' : ''"
                     :message="errors.first('icon')"
                     v-show="model.type != 2">
            <b-input name="icon" v-model="model.icon"
                     v-validate="model.type == 1 ? 'required|max:32' : '' " data-vv-as="图标"
                     class="w-25"></b-input>
          </b-field>
          <b-field label="排序" class="required-field"
                     :message="errors.first('sorted')"
                     :type="errors.has('sorted') ? 'is-danger' : ''">
            <b-input name="sorted" expanded v-model="model.sorted"
                     v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序"
                     class="w-25">
            </b-input>
          </b-field>
          <b-field label="标题"
                     :type="errors.has('title') ? 'is-danger' : ''"
                     :message="errors.first('title')"
                     v-show="model.type == 1">
            <b-input name="title" v-model="model.title" data-vv-as="标题"></b-input>
          </b-field>
          <b-field label="描述"
                     :type="errors.has('description') ? 'is-danger' : ''"
                     :message="errors.first('description')"
                     v-show="model.type == 1">
              <textarea name="description" v-model="model.description" data-vv-as="描述"
                        cols="100"></textarea>
          </b-field>
          <b-field class="field" message="不显示在菜单上"
                     v-show="model.type == 1">
            <b-switch v-model="model.hidden"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              隐藏
            </b-switch>
          </b-field>
          <b-field class="field" message="每个父菜单只有一个默认地址"
                     v-show="model.type == 1">
            <b-switch v-model="model.acquiescent"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              默认地址
            </b-switch>
          </b-field>
          <b-field class="field" message="辅助功能，自动生成CRUD菜单"
                     v-show="model.type == 1 && model.parentId == -1">
            <b-switch v-model="model.autoGen"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              自动生成CRUD菜单
            </b-switch>
          </b-field>
          <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control">
              <button class="button is-primary" @click="save" :disabled='errors.any()'
                      :class="{'is-loading' : saving}">
                <b-icon icon="check-circle"></b-icon>
                <span>保存</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {addMenu, deleteMenu, getMenu, menuTree, updateMenu} from '@/api/backend/system'

  const eventsList = [
    {name: 'node:clicked', args: ['Node']},
  ]

  function getData(subsystemId) {
    return new Promise(resolve => {
      menuTree(subsystemId).then(response => {
        const data = {
          id: -1,
          name: '菜单',
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
        subsystemId: this.$route.params.id,
        deleting: false,
        model: {},
        saving: false,
        addMenu: false,
        viewMenu: false,
        // tree数据
        selectedNode: undefined,
        treeData: getData(this.$route.params.id),
        opts: {
          propertyNames: {
            text: 'name'
          }
        }
      }
    },
    methods: {
      onAdd(id) {
        this.addMenu = true
        this.viewMenu = false
        this.model = {parentId: id, subsystemId: this.subsystemId}
      },
      itemClick(item) {
        console.log(item)
        this.selectedNode = item
        const id = item.id
        this.model = {}
        if (id === -1 || id === undefined) {
          this.addMenu = true
          this.viewMenu = false
          this.model = {parentId: id, subsystemId: this.subsystemId}
        } else {
          this.viewMenu = true
          this.addMenu = false
          getMenu(id).then(response => {
            this.model = response.data
          })
        }
      },
      removeNode(node) {
        node.remove()
      },
      addChildNode(node, child) {
        if (node.enabled()) {
          node.append(child)
        }
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
      },
      onEdit(id) {
        this.addMenu = true
        this.viewMenu = false
      },
      onDelete(id) {
        const vm = this
        vm.$deleteConfirm(() => {
          vm.deleting = true
          deleteMenu(id).then(response => {
            vm.deleting = false
            vm.model = {subsystemId: vm.subsystemId}
            vm.$successToast()
            vm.loadAsyncData()
          }).catch(err => {
            vm.deleting = false
          })
        })
      },
      save() {
        const vm = this
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.saving = true
            if (vm.model.sysPermissionId) {
              updateMenu(vm.model.sysPermissionId, vm.model).then(response => {
                vm.saving = false
                vm.$successToast()
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addMenu(vm.model).then(response => {
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
      loadAsyncData() {
        return new Promise(resolve => {
          menuTree(this.$route.params.id).then(response => {
            const data = {
              id: -1,
              name: '菜单',
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
