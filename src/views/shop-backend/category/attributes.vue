<template>
  <section>
    <div class="columns is-full-content">
      <div class="column is-one-fifth">
        <div class="card box-content1">
          <div class="card-content">
            <b-loading :is-full-page="isFullPage" :active.sync="isCateLoading"></b-loading>
            <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                      @handle="itemClick"></vue-tree>
          </div>
        </div>
      </div>
      <div class="column ml-2">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <span class="mr-2">{{cateModel.name}}</span>
              <button class="button is-primary" @click="onAdd()" :disabled="!viewCate">
                <b-icon icon="plus-circle-outline"></b-icon>
                <span>新增属性</span>
              </button>
            </div>
          </header>
          <div class="card-content">
            <b-table
                striped
                hoverable
                narrowed
                mobile-cards
                :data="attributes"
                :loading="loading"

                detailed
                detail-key="commodityAttributeId"
            >

              <template slot-scope="props">

                <b-table-column field="type" label="类型">
                  {{ $dictText('attributeType',props.row.type) }}
                </b-table-column>

                <b-table-column field="name" label="属性名">
                  {{ props.row.name }}
                </b-table-column>
                <b-table-column field="alias" label="别名">
                  {{ props.row.alias }}
                </b-table-column>
                <b-table-column field="alias" label="属性">
                  <b-taglist>
                    <b-tag type="is-light" v-show="props.row.inherit">继承上级</b-tag>
                    <b-tag type="is-primary" v-show="props.row.specAttr">规格属性</b-tag>
                    <b-tag type="is-success" v-show="props.row.keyAttr">关键属性</b-tag>
                    <b-tag type="is-dark" v-show="props.row.filterAttr">筛选属性</b-tag>
                    <b-tag type="is-black" v-show="props.row.listExtra">列表扩展</b-tag>
                  </b-taglist>
                </b-table-column>
                <b-table-column field="alias" label="约束">
                  <b-taglist>
                    <b-tag type="is-primary" v-show="props.row.required">必须的</b-tag>
                    <b-tag type="is-light" v-show="props.row.immutable">不可更改的</b-tag>
                  </b-taglist>
                </b-table-column>

                <b-table-column label="操作">
                  <a @click="onEdit(props.row.commodityAttributeId)" v-if="!props.row.inherit">
                    修改
                  </a>
                  <a @click="onDelete(props.row.commodityAttributeId)" v-if="!props.row.inherit">
                    删除
                  </a>
                </b-table-column>
              </template>
              <template slot="empty">
                <EmptyTable></EmptyTable>
              </template>
              <template slot="detail" slot-scope="props">
                <div class="columns is-size-7">
                  <div class="column">
                    <b-field label="必须的" horizontal class="static-field">
                      <p class="control is-size-7">
                        {{$boolText(props.row.required)}}
                      </p>
                    </b-field>
                    <b-field label="最小值" horizontal class="static-field" v-show="props.row.type == 1">
                      <p class="control is-size-7">
                        {{props.row.minValue}}
                      </p>
                    </b-field>
                    <b-field label="最小长度" horizontal class="static-field" v-show="props.row.type == 2">
                      <p class="control is-size-7">
                        {{props.row.minLength}}
                      </p>
                    </b-field>
                    <b-field label="默认值" horizontal class="static-field">
                      <p class="control is-size-7">
                        {{props.row.defaultValue}}
                      </p>
                    </b-field>
                    <b-field label="正则" horizontal class="static-field" v-show="props.row.type == 2">
                      <p class="control is-size-7">
                        {{props.row.regex}}
                      </p>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="不可更改的" horizontal class="static-field">
                      <p class="control is-size-7">
                        {{$boolText(props.row.immutable)}}
                      </p>
                    </b-field>
                    <b-field label="最大值" horizontal class="static-field" v-show="props.row.type == 1">
                      <p class="control is-size-7">
                        {{props.row.maxValue}}
                      </p>
                    </b-field>
                    <b-field label="最大长度" horizontal class="static-field" v-show="props.row.type == 2">
                      <p class="control is-size-7">
                        {{$boolText(props.row.maxLength)}}
                      </p>
                    </b-field>
                    <b-field label="可能的值" horizontal class="static-field">
                      <p class="control is-size-7">
                        {{props.row.possibleValues}}
                      </p>
                    </b-field>
                    <b-field label="列表键" horizontal class="static-field" v-show="props.row.listExtra">
                      <p class="control is-size-7">
                        {{props.row.extraKey}}
                      </p>
                    </b-field>
                  </div>
                </div>
                <div class="columns is-size-7" v-show="props.row.type == 5 || props.row.type == 6">
                  <div class="column">
                    <b-table striped
                             hoverable
                             narrowed
                             mobile-cards
                             :data="(props.row.options && props.row.options.length == 0) ? [] : props.row.options"
                    >
                      <template slot-scope="options">
                        <b-table-column field="value" label="选项值">
                          {{options.row.value}}
                        </b-table-column>
                        <b-table-column field="type" label="选项文本">
                          {{options.row.text}}
                        </b-table-column>
                      </template>
                    </b-table>
                  </div>
                </div>
              </template>
            </b-table>
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
  import AddForm from '@/views/shop-backend/category/attribute-add.vue'
  import EditForm from '@/views/shop-backend/category/attribute-edit.vue'
  import {
    cateTree
  } from '@/api/commodity/category'
  import {
    listAttr, deleteAttr
  } from '@/api/commodity/attribute'

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
        attributes: [],
        viewCate: false,
        cateModel: {},
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
      onAdd () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增属性',
          width: '30%',
          component: AddForm,
          props: {
            commodityCategoryKey: this.cateModel.commodityCategoryKey
          },
          onClose: () => { vm.loadAttr() }
        })
      },
      onEdit (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改属性',
          width: '30%',
          component: EditForm,
          props: {
            "commodityAttributeId": id
          },
          onClose: () => { vm.loadAttr() }
        })
      },
      itemClick (item) {
        const id = item.id
        this.cateModel = item
        if (id !== -1) {
          this.viewCate = true
          this.loadAttr()
        }
      },
      loadAttr() {
        this.ifViewLoading = true
        listAttr({category: this.cateModel.commodityCategoryKey}).then(response => {
          this.attributes = response.data
          this.ifViewLoading = false
        })
      },
      onDelete(commodityAttributeId) {
        const vm = this
        vm.ifViewLoading = true
        vm.$deleteModel(deleteAttr, commodityAttributeId,
            () => vm.loadAttr())
      },
      loadAsyncData () {
        const vm = this
        vm.isCateLoading = true
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
