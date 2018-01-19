<template>
  <section>
    <div>
      <button class="button is-primary is-small" @click="savePermit" :disabled='permitTreeData.length == 0'
              :class="{'is-loading' : saving}">
        <b-icon icon="check-circle"></b-icon>
        <span>保存授权</span>
      </button>
      <vue-tree v-model="permitCheckedIds" :tree-data="permitTreeData" :options="permitOptions"></vue-tree>

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
        saving: false,
        // tree数据
        permitTreeData: [],
        // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
        permitCheckedIds: [],
        // 设置项
        permitOptions: {
          // Number,初始化时展开层级,根节点为0,默认0
          depthOpen: 10,
//          idsWithParent: false,
          checkbox: true,
          showEdit: false,
          showDelete: false,
          showAdd: false
        }
      };
    },
    methods: {
      savePermit(id) {
          const roles = [];
          const menus = [];
        const permitModel = {
          sysUserId : this.$route.params.id,
          roles: this.permitCheckedIds
        }
        const vm = this;
        permit(this.$route.params.id, permitModel).then(response => {
          vm.saving = false;
          successToast(vm)
//          vm.loadAsyncData();
        }).catch(err =>{
          vm.saving = false;
        })
      },
      loadAsyncData() {
        const  vm = this;
        vm.loading = true;
        getAvailableRole().then(response => {
          const vm = this;
          vm.permitTreeData = response.data;
        })
        getPermitted(this.$route.params.id).then(response => {
          const vm = this;
          vm.permitCheckedIds = response.data;
        })
      }
    },
    created() {
      this.loadAsyncData();
    }
  };
</script>

