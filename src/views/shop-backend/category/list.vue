<template>
  <section class="ml-2 mt-3">
    <div class="columns">
      <div class="column is-one-fifth  is-size-7 vue-tree">
        <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                  @handle="itemClick" style="height: 500px;overflow-y: auto"></vue-tree>
      </div>
      <div class="column ml-2">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <div class="ml-3 buttons">
                <button class="button" @click="onEdit" v-show="clickedModel.commodityCategoryId">
                  <span>类目详情</span>
                </button>
                <button class="button" @click="onAdd(model.commodityCategoryId)">
                  <span>新增子类目</span>
                </button>
                <button class="button" style="height: 2.4em;"
                        @click="onDisable(model.commodityCategoryId)"
                        :class="{'is-loading' : deleting}"
                        v-show="model.state == 5">
                  <b-icon icon="lock"></b-icon>
                  <span>停用</span>
                </button>
                <button class="button" style="height: 2.4em;"
                        @click="onEnable(model.commodityCategoryId)"
                        :class="{'is-loading' : deleting}"
                        v-show="model.state == 6">
                  <b-icon icon="lock-open"></b-icon>
                  <span>启用</span>
                </button>
              </div>
            </div>
          </header>
          <div class="card-content" v-show="viewCate">
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

          <div class="card-content" v-show="addCate">
            <jcc-field label="名称" horizontal class="required-field" :type="errors.has('name') ? 'is-danger' : ''"
                       :message="errors.first('name')">
              <b-input name="name" v-model="model.name"
                       v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
            </jcc-field>
            <jcc-field label="排序" horizontal class="required-field" :message="errors.first('sorted')"
                       :type="errors.has('sorted') ? 'is-danger' : ''">
              <b-input name="sorted" expanded v-model="model.sorted"
                       v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序"
                       class="w-15">
              </b-input>
            </jcc-field>
            <jcc-field label="状态" horizontal class="required-field" :message="errors.first('state')"
                       :type="errors.has('state') ? 'is-danger' : ''">
              <dict-radio-button :model="model" param-name="state" dict-code="commodityCategoryState"></dict-radio-button>
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

      </div>

    </div>
  </section>
</template>
<script>
  import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
  import {
    cateTree,
    getCate,
    addCate,
    disable,
    enable,
    updateCate
  } from '@/api/commodity/category'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
        deleting: false,
        clickedModel: {},
        model: {},
        saving: false,
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
      removeArray (array, element) {
        const index = array.indexOf(element)
        if (index !== -1) {
          array.splice(index, 1)
        }
      },
      onAdd (id) {
        this.addCate = true
        this.viewCate = false
        this.model = {parentId: id}
      },
      itemClick (item) {
        const id = item.id
        if (id === -1) {
          this.addCate = true
          this.viewCate = false
          this.model = {parentId: id}
          this.clickedModel = this.model
        } else {
          this.viewCate = true
          this.addCate = false
          getCate(id).then(response => {
            this.model = response.data
            this.clickedModel = this.model
          })
        }
      },
      onEdit (id) {
        this.addCate = true
        this.viewCate = false
        this.model = this.clickedModel
      },
      onDisable (id) {
        const vm = this
        vm.deleting = true
        disable(id).then(response => {
          vm.deleting = false
          vm.$successToast()
          vm.loadAsyncData()
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
          vm.loadAsyncData()
        }).catch(err => {
          vm.deleting = false
        })
      },
      save () {
        const vm = this
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.saving = true
            if (vm.model.commodityCategoryId) {
              updateCate(vm.model.commodityCategoryId, vm.model).then(response => {
                vm.saving = false
                vm.$successToast()
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addCate(vm.model).then(response => {
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
      loadAsyncData () {
        const vm = this
        vm.loading = true
        this.addCate = false
        this.viewCate = false
        cateTree().then(response => {
          const data = {
            id: -1,
            name: '根目录',
            children: []
          }
          if (response.data && response.data.length > 0) {
            data.children = response.data
          }
          vm.treeData = [data]
          vm.loading = false
        })
      }
    },
    created () {
      this.loadAsyncData()
    }
  }
</script>
