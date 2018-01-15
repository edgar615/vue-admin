<template>
 <section>
   <div class="columns is-full-content">
     <div class="column is-one-fifth bg-main is-size-7 border-1" style="height: 500px;">
       <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                 @item-click="itemClick"></vue-tree>
     </div>
     <div class="column bg-main ml-2" v-show="viewMenu">
       <div class="menus_box">
         <b-field label="名称" horizontal class="static-field">
           <p class="control static-field">{{model.name}}</p>
         </b-field>
         <b-field label="路径" horizontal class="static-field">
           <p class="control">{{model.path}}</p>
         </b-field>
         <b-field label="图标" horizontal class="static-field">
           <p class="control">{{model.icon}}</p>
         </b-field>
         <b-field label="排序" horizontal class="static-field">
           <p class="control">{{model.sorted}}</p>
         </b-field>
         <b-field label="隐藏?" horizontal class="static-field">
           <p class="control">{{model.hidden}}</p>
         </b-field>
         <b-field label="默认地址?" horizontal class="static-field">
           <p class="control">{{model.acquiescent}}</p>
         </b-field>
         <b-field label="SP访问" horizontal  class="static-field">
           <p class="control">
            <span class="tag is-info">
            {{ dictText(this, "bool",model.spVisible) }}
            </span>
             </p>
         </b-field>
         <b-field label="SO访问" horizontal  class="static-field">
           <p class="control">
            <span class="tag is-info">
              {{ dictText(this, "bool",model.soVisible) }}
              </span>
           </p>
         </b-field>
         <b-field><!-- Label left empty for spacing -->
           <p class="control" style="padding-left: 100px; box-sizing: border-box; margin-top: 50px;">
             <button class="button is-primary" @click="onAdd(model.sysMenuId)" v-show="model.parentId == -1">
               <b-icon icon="plus"></b-icon>
               <span>新增子菜单</span>
             </button>
             <button class="button is-primary" @click="onEdit">
               <b-icon icon="pencil"></b-icon>
               <span>修改</span>
             </button>
             <button class="button is-danger" style="height: 2.4em;" @click="onDelete(model.sysMenuId)"
                     :class="{'is-loading' : deleting}">
               <b-icon icon="trash"></b-icon>
               <span>删除</span>
             </button>
           </p>
         </b-field>
       </div>
     </div>

     <div class="column bg-main ml-2" v-show="addMenu">
       <div class="menus_box">
         <jcc-field label="名称"  horizontal :type="errors.has('name') ? 'is-danger' : ''" :message="errors.first('name')">
           <b-input name="name" v-model="model.name"
                    v-validate="'required|max:64'"  data-vv-as="名称"  style="width: 400px;"></b-input>
         </jcc-field>
         <jcc-field label="路径" horizontal  :type="errors.has('path') ? 'is-danger' : ''" :message="errors.first('path')">
           <b-input name="path" v-model="model.path"
                    v-validate="'required|max:64|menu'"  data-vv-as="路径"  style="width: 400px;"></b-input>
         </jcc-field>
         <jcc-field label="图标" horizontal  :type="errors.has('icon') ? 'is-danger' : ''" :message="errors.first('icon')">
           <b-input name="icon" v-model="model.icon"
                    v-validate="'required|max:32'"  data-vv-as="图标" class="input-l"></b-input>
         </jcc-field>
         <jcc-field label="排序" horizontal  :message="errors.first('sorted')"
                    :type="errors.has('sorted') ? 'is-danger' : ''">
           <b-input name="sorted" expanded v-model="model.sorted"
                    v-validate="'required|numeric|min_value:0|max_value:9999'"  data-vv-as="排序"  style="width: 100px;">
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
         <jcc-field class="field" horizontal message="SP访问权限为'false'时，SP用户无法访问，但不影响创建应用">
           <b-switch v-model="model.spVisible"
                     true-value="true"
                     false-value="false"
                     type="is-info">
             SP访问权限
         </b-switch>
         </jcc-field>
         <jcc-field class="field" horizontal message="SO访问权限为'false'时，SO用户无法访问，也不能给SO创建这个应用">
           <b-switch v-model="model.soVisible"
                     true-value="true"
                     false-value="false"
                     type="is-info">
             SO访问权限
         </b-switch>
         </jcc-field>
         <jcc-field class="field" horizontal message="辅助功能，自动生成CRUD菜单"
                    v-show="model.parentId == -1">
           <b-switch v-model="model.autoGen"
                     true-value="true"
                     false-value="false"
                     type="is-info">
             自动生成CRUD菜单
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
   </div>
 </section>
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

