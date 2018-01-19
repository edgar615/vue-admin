<template>
  <section>
    <div class="columns is-full-content">
      <div class="column is-one-fifth bg-main is-size-7 border-1" style="height: 500px;">
        <vue-tree :tree-data="permitTreeData" :options="permitOptions" @item-click="savePermit"></vue-tree>
      </div>
      <div class="column is-one-fifth bg-main is-size-7 border-1">
        <b-table
          narrowed
          bordered
          mobile-cards

          :loading="loading"
          :data="roles.length == 0 ? [] : roles"
        >
          <template slot-scope="props" slot="header">
            <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
              {{ props.column.label }}
            </b-tooltip>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
          <template slot-scope="props">

            <b-table-column label="角色">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-danger is-small" title="删除">
                <b-icon icon="trash"></b-icon>
              </button>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import { getAvailableRole, getPermitted, permit } from '@/api/sys/sysuser';
  import { deleteConfirm, successToast } from '@/utils/dialog';
  export default {
    components: {
      VueTree
    },
    data() {
      return {
        model : {},
        roles: [],
        loading: true,
        // tree数据
        permitTreeData: [],
        // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
        permitCheckedIds: [],
        // 设置项
        permitOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          depthOpen: 10,
//          idsWithParent: false,
          checkbox: false,
          showEdit: false,
          showDelete: false,
          showAdd: false
        }
      };
    },
    methods: {
      savePermit(id) {
        console.log(id);
//           const roles = [];
//         const permitModel = {
//           sysUserId : this.$route.params.id,
//           roles: this.permitCheckedIds
//         }
//         const vm = this;
//         permit(this.$route.params.id, permitModel).then(response => {
//           vm.saving = false;
//           successToast(vm)
// //          vm.loadAsyncData();
//         }).catch(err =>{
//           vm.saving = false;
//         })
      },
      loadAsyncData() {
        const  vm = this;
        vm.loading = true;
        getAvailableRole().then(response => {
          const vm = this;
          vm.permitTreeData = response.data;
        })
        getPermitted(this.$route.params.id).then(response => {
          vm.loading = false;
          vm.roles = response.data;
        }).catch(err =>{
          vm.loading = false;
        })
      }
    },
    created() {
      this.loadAsyncData();
    }
  };
</script>

