<template>
  <section>
    <div class="columns is-full-content">
      <div class="column is-one-fifth bg-main is-size-7 border-1" style="height: 500px;">
        <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                  @item-click="itemClick"></vue-tree>
      </div>
      <div class="column bg-main ml-2" v-show="viewRole">
        <div class="menus_box">
          <b-field label="名称" horizontal class="static-field">
            <p class="control static-field">{{model.name}}</p>
          </b-field>
          <b-field><!-- Label left empty for spacing -->
            <p class="control" style="padding-left: 100px; box-sizing: border-box; margin-top: 50px;">
              <button class="button is-primary" @click="onAdd(model.sysRoleId)">
                <b-icon icon="plus"></b-icon>
                <span>新增角色</span>
              </button>
              <button class="button is-link" @click="onEdit"
                      v-show="model.parentId != -1">
                <b-icon icon="pencil"></b-icon>
                <span>修改角色</span>
              </button>
              <button class="button is-danger" style="height: 2.4em;" @click="onDelete(model.sysRoleId)"
                      :class="{'is-loading' : deleting}" v-show="model.parentId != -1">
                <b-icon icon="trash"></b-icon>
                <span>删除</span>
              </button>
              <button class="button is-warning" style="height: 2.4em;" @click="onPermit(model.sysRoleId)"
                      v-show="model.parentId != -1">
                <b-icon icon="key"></b-icon>
                <span>授权</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column bg-main ml-2" v-show="addRole">
        <div class="menus_box">
          <jcc-field label="名称"  horizontal :type="errors.has('name') ? 'is-danger' : ''" :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="名称"  style="width: 400px;"></b-input>
          </jcc-field>
          <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control">
              <button class="button is-primary" @click="save"
                      :class="{'is-loading' : saving}">
                <b-icon icon="check-circle"></b-icon>
                <span>保存</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column bg-main ml-2 is-size-7 border-1" v-show="rolePermit">
        <span class="is-size-6">设置角色对应的功能权限</span>
        <span class="ml-5">
          <button class="button is-link is-small" @click="onCheckAll" :disabled='permitTreeData.length == 0'>
          <span v-show="checkAll">清空</span>
         <span v-show="!checkAll">全选</span>
        </button>
        <button class="button is-primary is-small" @click="savePermit" :disabled='permitTreeData.length == 0'
                :class="{'is-loading' : saving}">
          <b-icon icon="check-circle"></b-icon>
          <span>保存授权</span>
        </button>
        </span>

        <div v-for="system in permitTreeData" :key="system.id">
          <div class="mt-3 mb-3 is-size-6">{{system.name}}</div>
          <div class="columns" v-for="level1 in system.permissions" :key="level1.id">
            <div class="column is-3 bg-dark-blue border-1 has-text-right" style="padding: auto;">
              <span>{{level1.name}}</span>
              <div class="mt-1">
              <button class="button is-link is-small" @click="onCheckLevel1(level1)">
                全选
              </button>
              <button class="button is-link is-small" @click="onUnCheckLevel1(level1)">
                清空
              </button>
            </div>
            </div>
            <div class="column border-1"  style="padding: auto;">
              <label class="checkbox-block"  v-for="level2 in level1.children" :key="level2.id">
                <b-checkbox
                    v-model="permitModel.permissions"
                    :native-value="level2.id">
                    {{level2.name}}
                </b-checkbox>
                </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import { roleTree ,getRole, addRole, deleteRole, updateRole,getSystem, getPermitted, permit } from '@/api/sys/role';
  import { deleteConfirm, successToast } from '@/utils/dialog';
  export default {
    components: {
      VueTree
    },
    data() {
      return {
//        subsystemId: this.$route.params.id,
        checkAll : false,
        allPermssions:[],
        deleting: false,
        permitModel: {
          permissions: []
        },
        model : {
        },
        saving: false,
        addRole : false,
        viewRole: false,
        rolePermit: false,
        // tree数据
        treeData: [],
        // 设置项
        options: {
          // Number,初始化时展开层级,根节点为0,默认0
          depthOpen: 6,
          checkbox: false,
          showEdit: false,
          showDelete: false,
          showAdd: false
        },
        // 功能权限
        permitTreeData: [],
      };
    },
    methods: {
      removeArray(array, element) {
          const index = array.indexOf(element);
          if (index !== -1) {
            array.splice(index, 1);
          }
        },
      onAdd(id) {
        this.addRole = true;
        this.viewRole = false;
        this.model = {parentId : id};
      },
      itemClick(id) {
        if (id == -1) {
          this.addRole = true;
          this.viewRole = false;
          this.rolePermit = false;
          this.model = {parentId : id};
        } else {
          this.viewRole = true;
          this.addRole = false;
          this.rolePermit = false;
          getRole(id).then(response => {
            this.model = response.data;
          })
        }
      },
      onEdit(id) {
        this.addRole = true;
        this.viewRole = false;
        this.rolePermit = false;
      },
      onCheckAll() {
         if (this.checkAll) {
           this.checkAll = false;
            this.permitModel.permissions = [];
         } else {
           this.checkAll = true;
             this.permitModel.permissions = this.allPermssions;
         }
      },
      onCheckLevel1(level1) {
        const childPermissions =level1.children.map(function(item, index, input) {
          return item.id;
        })
        this.permitModel.permissions = Array.from(new Set(Array.concat(this.permitModel.permissions, childPermissions)));
      },
      onUnCheckLevel1(level1) {
          const vm = this;
        level1.children.forEach(function(item, index, input) {
          vm.removeArray(vm.permitModel.permissions, item.id)
        })
      },
      savePermit(id) {
        const permitModel = {
            roleId : this.model.sysRoleId,
             permissions : this.permitModel.permissions
        }
        const vm = this;
        permit(permitModel).then(response => {
          vm.saving = false;
          successToast(vm)
//          vm.loadAsyncData();
        }).catch(err =>{
          vm.saving = false;
        })
      },
      onPermit(id) {
        this.addRole = false;
        this.viewRole = false;
        this.rolePermit = true;
        getSystem(id).then(response => {
            const vm = this;
          vm.permitTreeData = response.data;
          var allPermssions = [];
            response.data.forEach(function(item, index, input) {
              item.permissions.forEach(function(level1) {
                  allPermssions.push(level1.id);
                allPermssions = Array.concat(allPermssions, level1.children.map(function(level2) {
                    return level2.id;
                }))
              })
            })
          this.allPermssions = allPermssions;
        })
        getPermitted(id).then(response => {
          this.permitModel.permissions = response.data.permissions;
        })
      },
      onDelete(id) {
        const vm = this;
        deleteConfirm(vm,() => {
          vm.deleting = true;
          deleteRole(id).then(response => {
            vm.deleting = false;
            successToast(vm);
            vm.loadAsyncData();
          }).catch(err => {
            vm.deleting = false;
          });
        })
      },
      save() {
        const vm = this;
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.saving = true
            if (vm.model.sysRoleId) {
              updateRole(vm.model.sysRoleId, vm.model).then(response => {
                vm.saving = false;
                successToast(vm)
                vm.loadAsyncData();
              }).catch(err =>{
                vm.saving = false;
              })
            } else {
              addRole(vm.model).then(response => {
                vm.saving = false;
                successToast(vm)
                vm.loadAsyncData();
              }).catch(err =>{
                vm.saving = false;
              })
            }

          }
        });
      },
      loadAsyncData() {
        const  vm = this;
        vm.loading = true;
        this.addRole = false;
        this.viewRole = false;
        roleTree().then(response => {
          vm.treeData = response.data;
          vm.loading = false;
        });
      }
    },
    created() {
      this.loadAsyncData();
    }
  };
</script>

<style>

  /**-二级菜单的checkbox-*/
  label.checkbox-block {
    display: block;
    margin-bottom: 5px;
    float: left;
    width: 15%;
    margin-left:18px;
  }
  label.checkbox-block input[type='checkbox'] {
    margin-left:-18px;
  }
</style>
