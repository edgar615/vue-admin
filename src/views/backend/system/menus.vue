<template>
    <div class="columns">
      <div class="column is-one-fifth">
        <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                  @item-click="itemClick"></vue-tree>
      </div>
      <div class="column is-two-fifths" v-show="viewMenu">
        <b-field label="名称" horizontal class="static-field">
          <p class="control static-field">{{model.name}}</p>
        </b-field>
        <b-field label="路径" horizontal class="static-field">
          <p class="control">{{model.path}}</p>
        </b-field>
        <b-field label="隐藏?" horizontal class="static-field">
          <p class="control">{{model.hidden}}</p>
        </b-field>
        <b-field label="默认地址?" horizontal class="static-field">
          <p class="control">{{model.acquiescent}}</p>
        </b-field>
        <b-field><!-- Label left empty for spacing -->
          <p class="control">
            <button class="button is-primary" @click="onAdd(model.sysMenuId)" v-show="model.parentId == -1">
              <b-icon icon="plus"></b-icon>
              <span>新增子菜单</span>
            </button>
            <button class="button is-info" @click="onEdit">
              <b-icon icon="pencil"></b-icon>
              <span>修改</span>
            </button>
            <button class="button is-danger" @click="onDelete(model.sysMenuId)"
                    :class="{'is-loading' : deleting}">
              <b-icon icon="trash"></b-icon>
              <span>删除</span>
            </button>
          </p>
        </b-field>
      </div>
      <div class="column is-two-fifths" v-show="addMenu">
        <jcc-field label="名称"  horizontal :type="errors.has('name') ? 'is-danger' : ''" :message="errors.first('name')">
          <b-input name="name" v-model="model.name"
                   v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
        </jcc-field>
        <jcc-field label="路径" horizontal  :type="errors.has('path') ? 'is-danger' : ''" :message="errors.first('path')">
          <b-input name="path" v-model="model.path"
                   v-validate="'required|max:64|alpha_dash'"  data-vv-as="路径"></b-input>
        </jcc-field>
        <jcc-field label="排序" horizontal  :message="errors.first('sorted')"
                 :type="errors.has('sorted') ? 'is-danger' : ''">
          <b-input name="sorted" expanded v-model="model.sorted"
                   v-validate="'required|numeric|min_value:0|max_value:9999'"  data-vv-as="排序">
          </b-input>
        </jcc-field>
        <jcc-field class="field" horizontal message="不显示在菜单上">
          <b-switch v-model="model.hidden"
                    true-value="true"
                    false-value="false"
                    type="is-info">
            隐藏
        </b-switch>
        </jcc-field>
        <jcc-field class="field" horizontal message="每个父菜单只有一个默认地址">
          <b-switch v-model="model.acquiescent"
                    true-value="true"
                    false-value="false"
                    type="is-info">
            默认地址
        </b-switch>
        </jcc-field>
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
</template>
<script>
   import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
   import { menuList, getMenu, addMenu, deleteMenu, updateMenu } from '@/api/backend/system';
   import { deleteConfirm, successToast } from '@/utils/dialog';
    export default {
      components: {
        VueTree
      },
        data() {
            return {
                subsystemId: this.$route.params.id,
              deleting: false,
                model : {},
                saving: false,
                addMenu : false,
               viewMenu: false,
              // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
//              checkedIds: ["4"],
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
              }
            };
        },
      methods: {
        onAdd(id) {
          this.addMenu = true;
          this.viewMenu = false;
          this.model = {parentId : id, subsystemId: this.subsystemId};
        },
        itemClick(id) {
            if (id == -1) {
              this.addMenu = true;
              this.viewMenu = false;
              this.model = {parentId : id, subsystemId: this.subsystemId};
            } else {
              this.viewMenu = true;
              this.addMenu = false;
              getMenu(id).then(response => {
                this.model = response.data;
              })
            }
        },
        onEdit(id) {
          this.addMenu = true;
          this.viewMenu = false;
        },
        onDelete(id) {
            const vm = this;
          deleteConfirm(vm,() => {
            vm.deleting = true;
            deleteMenu(id).then(response => {
              vm.deleting = false;
              vm.model = {subsystemId: vm.subsystemId}
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
              if (vm.model.sysMenuId) {
                updateMenu(vm.model.sysMenuId, vm.model).then(response => {
                  vm.saving = false;
                  successToast(vm)
                  vm.loadAsyncData();
                }).catch(err =>{
                  vm.saving = false;
                })
              } else {
                addMenu(vm.model).then(response => {
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
          this.addMenu = false;
          this.viewMenu = false;
          menuList(this.$route.params.id).then(response => {
            const data = {
                id : -1,
                 name : '根目录',
                 children: []
            }
            if (response.data && response.data.length > 0) {
              data.children =response.data;
            }
            vm.treeData = [data];
            vm.loading = false;
          });
        }
      },
      created() {
        this.loadAsyncData();
      }
    };
</script>
