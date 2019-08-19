<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
      </div>
    </nav>
    <div class="columns is-full-content">
      <div class="column is-one-fifth">
        <div class="box-content1 notification is-primary" data-simplebar>
            <b-loading :is-full-page="isFullPage" :active.sync="isCateLoading"></b-loading>
            <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                      @handle="itemClick"></vue-tree>
        </div>
      </div>
      <div class="column ml-2" v-show="addCate">
        <div class="card box-content1">
          <header class="card-header">
            <div class="card-header-title">
              <div class="ml-3 buttons">
                <button class="button m-1" @click="onAdd(-1)">
                  <span>新增类目</span>
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div class="column ml-2" v-show="viewCate">
        <div class="card box-content1">
          <b-loading :is-full-page="isFullPage" :active.sync="ifViewLoading"></b-loading>
          <header class="card-header">
            <div class="card-header-title">
              <div class="ml-3 buttons">
                <button class="button m-1" @click="onAdd(model.commodityCategoryId)" :disabled="!model.commodityCategoryId || deleting || model.level == 4">
                  <span>新增子类目</span>
                </button>
                <button class="button m-1" @click="onEdit(model.commodityCategoryId)" :disabled="!model.commodityCategoryId || deleting">
                  <span>修改类目</span>
                </button>
                <button class="button m-1"
                        @click="onDisable(model.commodityCategoryId)"
                        :class="{'is-loading' : deleting}"
                        v-show="model.state == 5">
                  <b-icon icon="lock"></b-icon>
                  <span>停用</span>
                </button>
                <button class="button m-1"
                        @click="onEnable(model.commodityCategoryId)"
                        :class="{'is-loading' : deleting}"
                        v-show="model.state == 6">
                  <b-icon icon="lock-open"></b-icon>
                  <span>启用</span>
                </button>
              </div>
            </div>
          </header>
          <div class="card-content">
            <b-field label="名称" horizontal class="static-field">
              <p class="control static-field">{{model.name}}</p>
            </b-field>
            <b-field label="排序" horizontal class="static-field">
              <p class="control">{{model.sorted}}</p>
            </b-field>
            <b-field label="状态" horizontal class="static-field">
              <p class="control">{{ $dictText('commodityCategoryState',model.state) }}</p>
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
  import AddForm from '@/views/shop-backend/category/add.vue'
  import EditForm from '@/views/shop-backend/category/edit.vue'
  import {
    cateTree,
    getCate,
    disable,
    enable
  } from '@/api/commodity/category'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
        isFullPage: false,
        isCateLoading: true,
        ifViewLoading: false,
        deleting: false,
        model: {},
        addCate: false,
        viewCate: false,
        // tree数据
        treeData: [],
        // 设置项
        options: {
          // Number,初始化时展开层级,根节点为0,默认0
          label: 'name',
          depthOpen: 3,
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
          name: '新增类目',
          width: '30rem',
          component: AddForm,
          props: {
            parentId: id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      onEdit (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改类目',
          width: '30rem',
          component: EditForm,
          props: {
            "commodityCategoryId": id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      itemClick (item) {
        const id = item.id
        this.onView(id)
      },
      onView (id) {
        if (id === -1) {
          this.addCate = true
          this.viewCate = false
          this.model = {parentId: id}
        } else {
          this.viewCate = true
          this.addCate = false
          this.ifViewLoading = true
          getCate(id).then(response => {
            this.model = response.data
            this.ifViewLoading = false
          })
        }
      },
      onDisable (id) {
        const vm = this
        vm.deleting = true
        disable(id).then(response => {
          vm.deleting = false
          vm.$successToast()
          vm.onView(id)
        }).catch(err => {
          vm.deleting = false
        })
      },
      onEnable (id) {
        const vm = this
        vm.deleting = true
        enable(id).then(response => {
          vm.deleting = false
          vm.$successToast()
          vm.onView(id)
        }).catch(err => {
          vm.deleting = false
        })
      },
      loadAsyncData () {
        const vm = this
        vm.isCateLoading = true
        this.addCate = false
        this.viewCate = false
        cateTree().then(response => {
          const data = {
            id: -1,
            name: '类目列表',
            children: []
          }
          if (response.data && response.data.length > 0) {
            data.children = response.data
          }
          vm.treeData = [data]
          vm.isCateLoading = false
        })
      }
    },
    created () {
      this.loadAsyncData()
    }
  }
</script>
