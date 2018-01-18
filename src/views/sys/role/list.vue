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
                <span>保存授权</span>
              </button>
            </p>
          </b-field>
        </div>
      </div>

      <div class="column bg-main ml-2 is-size-7 border-1" v-show="rolePermit" style="height: 500px;">
        <button class="button is-primary is-small" @click="savePermit" :disabled='permitTreeData.length == 0'
                :class="{'is-loading' : saving}">
          <b-icon icon="check-circle"></b-icon>
          <span>保存</span>
        </button>
        <vue-tree v-model="permitCheckedIds" :tree-data="permitTreeData" :options="permitOptions"></vue-tree>
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
        deleting: false,
        model : {},
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
        // tree数据
        permitTreeData: [],
        // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
        permitCheckedIds: [],
        // 设置项
        permitOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          depthOpen: 6,
//          idsWithParent: false,
          checkbox: true,
          showEdit: false,
          showDelete: false,
          showAdd: false
        }
      };
    },
    methods: {
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
      savePermit(id) {
          const systems = [];
          const menus = [];
        this.permitCheckedIds.forEach(function(item, index, input) {
            if ((typeof  item) == 'string') {
                if (item.substr(0, 2) == 's-') {
                  systems.push(item.substr(2))
                }
            } else {
                menus.push(item);
            }
        })
        const permitModel = {
            roleId : this.model.sysRoleId,
          systems: systems,
          menus: menus
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
          vm.permitTreeData = [];
            response.data.forEach(function(item, index, input) {
                const sysData = {};
                sysData.parentId = -1;
                //子系统的ID用s-开头，用于区分
                sysData.id = "s-" + item.subsystemId;
                sysData.name = item.name;
                sysData.children = item.menus;
              vm.permitTreeData.push(sysData);
            })
        })
        getPermitted(id).then(response => {
          const vm = this;
          vm.permitCheckedIds = []
          response.data.systems.forEach(function(item, index, input) {
            vm.permitCheckedIds.push("s-" + item);
          })
          vm.permitCheckedIds = vm.permitCheckedIds.concat(response.data.menus);
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

