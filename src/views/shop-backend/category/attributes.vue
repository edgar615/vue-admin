<template>
  <section class="ml-2 mt-3">
    <div class="columns">
      <div class="column is-one-fifth  is-size-7 border-1 box-shadow">
        <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options"
                  @handle="itemClick" style="height: 500px;overflow-y: auto"></vue-tree>
      </div>
      <div class="column border-1  ml-2" v-show="viewAttribute">
        <div class="card mt-3">
          <div class="card-content">
            <div class="field is-grouped">
              <div class="buttons">
                <a @click="onAdd" class="button is-primary">
                  <b-icon icon="plus-circle-outline"></b-icon>
                  <span>新增</span>
                </a>
              </div>
            </div>

            <b-table
              striped
              hoverable
              narrowed
              mobile-cards
              :data="attributes"
              :loading="loading"
            >

              <template slot-scope="props">

                <b-table-column field="type" label="类型">
                  {{ $dictText(this, 'attributeType',props.row.type) }}
                </b-table-column>

                <b-table-column field="name" label="属性名">
                  {{ props.row.name }}
                </b-table-column>
                <b-table-column field="alias" label="别名">
                  {{ props.row.alias }}
                </b-table-column>
                <b-table-column field="alias" label="规格属性">
                  {{ props.row.specAttr }}
                </b-table-column>

                <b-table-column label="操作">
                  <router-link :to="{path:  '/application/' +props.row.applicationId + '/view' }"
                               exact class="button is-info is-small" title="查看">
                    <b-icon icon="information-outline"></b-icon>
                  </router-link>
                  <router-link :to="{path:  '/application/' +props.row.applicationId + '/edit' }"
                               exact class="button is-link is-small" title="修改">
                    <b-icon icon="circle-edit-outline"></b-icon>
                  </router-link>
                  <button class="button is-danger is-small" @click="doLock(props.row.applicationId)"
                          title="锁定" v-show="props.row.state == 1">
                    <b-icon icon="lock-outline"></b-icon>
                  </button>
                  <button class="button is-danger is-small"
                          @click="doUnLock(props.row.applicationId)"
                          title="解锁" v-show="props.row.state == 2">
                    <b-icon icon="lock-open-outline"></b-icon>
                  </button>
                </b-table-column>
              </template>
              <template slot="empty">
                <EmptyTable></EmptyTable>
              </template>
            </b-table>
          </div>
        </div>
      </div>

      <div class="column border-1  ml-2" v-show="addAttribute">
        <div class="menus_box">
          <jcc-field label="类型" horizontal
                     :type="errors.has('type') ? 'is-danger' : ''"
                     :message="errors.first('type')">
            <b-select name="type" expanded v-model="model.type"
                      v-validate="'required'" data-vv-as="类型" class="w-15">
              <option
                v-for="option in $dictList(this, 'metadataType')"
                :value="option.dictValue"
                :key="option.dictValue">d
                {{ option.dictText }}
              </option>
            </b-select>
          </jcc-field>
          <jcc-field label="类目" horizontal
                     :type="errors.has('category') ? 'is-danger' : ''"
                     :message="errors.first('category')">
            <b-input name="category" v-model="model.category"
                     v-validate="'required|max:64'" data-vv-as="类目" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="亚类" horizontal
                     :type="errors.has('subcategory') ? 'is-danger' : ''"
                     :message="errors.first('subcategory')">
            <b-input name="subcategory" v-model="model.subcategory"
                     v-validate="'required|max:64'" data-vv-as="亚类" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="名称" horizontal
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'" data-vv-as="名称" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="别名" horizontal
                     :type="errors.has('alias') ? 'is-danger' : ''"
                     :message="errors.first('alias')">
            <b-input name="alias" v-model="model.alias"
                     v-validate="'required|max:128'" data-vv-as="别名" class="w-50"></b-input>
          </jcc-field>
          <jcc-field class="field" horizontal message="必填项">
            <b-switch v-model="model.required"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              必填项
            </b-switch>
          </jcc-field>
          <jcc-field class="field" horizontal message="不可变值">
            <b-switch v-model="model.immutable"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              不可变值
            </b-switch>
          </jcc-field>
          <jcc-field label="默认值" horizontal
                     :type="errors.has('defaultValue') ? 'is-danger' : ''"
                     :message="errors.first('defaultValue')">
            <b-input name="defaultValue" v-model="model.defaultValue"
                     data-vv-as="默认值" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="最小值" horizontal v-show="model.type == 1"
                     :type="errors.has('minValue') ? 'is-danger' : ''"
                     :message="errors.first('minValue')">
            <b-input name="minValue" expanded v-model="model.minValue"
                     v-validate="'numeric'" data-vv-as="最小值" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最大值" horizontal v-show="model.type == 1"
                     :type="errors.has('maxValue') ? 'is-danger' : ''"
                     :message="errors.first('maxValue')">
            <b-input name="maxValue" expanded v-model="model.maxValue"
                     v-validate="'numeric'" data-vv-as="最大值" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最小长度" horizontal v-show="model.type == 2"
                     :type="errors.has('minLength') ? 'is-danger' : ''"
                     :message="errors.first('minLength')">
            <b-input name="minLength" expanded v-model="model.minLength"
                     v-validate="'numeric'" data-vv-as="最小长度" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最大长度" horizontal v-show="model.type == 2"
                     :type="errors.has('maxLength') ? 'is-danger' : ''"
                     :message="errors.first('maxLength')">
            <b-input name="maxLength" expanded v-model="model.maxLength"
                     v-validate="'numeric'" data-vv-as="最大长度" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="正则表达式" horizontal
                     :type="errors.has('regex') ? 'is-danger' : ''"
                     :message="errors.first('regex')">
            <b-input name="regex" v-model="model.regex"
                     data-vv-as="正则表达式" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="可能的值" horizontal
                     :type="errors.has('possibleValues') ? 'is-danger' : ''"
                     :message="['多个值用,分隔',errors.first('possibleValues')]">
            <b-input name="possibleValues" v-model="model.possibleValues"
                     data-vv-as="可能的值" class="w-75"></b-input>
          </jcc-field>
          <b-field horizontal>
            <p class="control btn_margin">
              <button class="button is-primary" :disabled='errors.any()'
                      :class="{'is-loading' : saving}">
                <b-icon icon="check-circle"></b-icon>
                <span>保存</span>
              </button>
              <button class="button">
                <b-icon icon="undo"></b-icon>
                <span>返回</span>
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
  import {
    cateTree
  } from '@/api/commodity/category'
  import {
    listAttr, addAttr, updateAttr, deleteAttr, getAttr
  } from '@/api/commodity/attribute'
  import {successToast} from '@/utils/dialog'

  export default {
    components: {
      VueTree
    },
    data () {
      return {
        attributes: [],
        deleting: false,
        model: {},
        saving: false,
        addAttribute: false,
        viewAttribute: false,
        // tree数据
        treeData: [],
        // 设置项
        options: {
          // Number,初始化时展开层级,根节点为0,默认0
          label: 'name',
          depthOpen: 6,
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
        this.addAttribute = true
        this.viewAttribute = false
        this.model = {parentId: id}
      },
      itemClick (item) {
        const id = item.id
        if (id === -1) {
          this.addAttribute = true
          this.viewAttribute = false
          this.attributes = []
        } else {
          this.viewAttribute = true
          this.addAttribute = false
          listAttr({category: item.commodityCategoryKey}).then(response => {
            this.attributes = response.data
          })
        }
      },
      onEdit (id) {
        this.addAttribute = true
        this.viewAttribute = false
        this.rolePermit = false
      },
      save () {
        const vm = this
        vm.$validator.validateAll().then((result) => {
          if (result) {
            vm.saving = true
            if (vm.model.commodityCategoryId) {
              updateCate(vm.model.commodityCategoryId, vm.model).then(response => {
                vm.saving = false
                successToast(vm)
                vm.loadAsyncData()
              }).catch(err => {
                vm.saving = false
              })
            } else {
              addAttribute(vm.model).then(response => {
                vm.saving = false
                successToast(vm)
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
        this.addAttribute = false
        this.viewAttribute = false
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
