<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.category" placeholder="类目"></b-input>
          <b-input v-model="filters.subcategory" placeholder="亚类"></b-input>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          元数据列表
          <div class="ml-3 buttons">
            <router-link to="/backend/meta/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增</span>
            </router-link>
          </div>
        </div>
      </header>

      <div class="card-content">
        <!--buefy的表格组件，具体用法查阅文档-->
        <b-table
          bordered
          striped
          hoverable
          narrowed
          mobile-cards

          :data="(pagination.records && pagination.records.length == 0) ? [] : pagination.records"
          :loading="loading"
          paginated
          backend-pagination
          :total="pagination.totalRecords"
          :per-page="pagination.pageSize"
          :current-page="pagination.page"
          @page-change="onPageChange"
          pagination-size="is-small"
          detailed
        >

          <template slot-scope="props">

            <b-table-column field="category" label="类目" numeric centered>
              {{ props.row.category }}
            </b-table-column>

            <b-table-column field="subcategory" label="亚类" centered>
              {{ props.row.subcategory }}
            </b-table-column>

            <b-table-column field="type" label="类型" centered>
              {{ dictText(this, 'metadataType',props.row.type) }}
            </b-table-column>

            <b-table-column field="name" label="属性名" centered>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="alias" label="别名" centered>
              {{ props.row.alias }}
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/backend/meta/' +props.row.metadataId + '/edit' }"
                           exact class="button is-small" title="修改">
                <b-icon icon="circle-edit-outline"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="doDelete(props.row.metadataId)"
                      title="删除">
                <b-icon icon="delete-outline"></b-icon>
              </button>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
          <template slot="detail" slot-scope="props">
            <div class="columns is-size-7">
              <div class="column">
                <b-field label="必填项" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.required}}
                  </p>
                </b-field>
                <b-field label="最小值" horizontal class="static-field" v-show="props.row.type == 1">
                  <p class="control is-size-7">
                    {{ props.row.minValue}}
                  </p>
                </b-field>
                <b-field label="最小长度" horizontal class="static-field" v-show="props.row.type == 2">
                  <p class="control is-size-7">
                    {{ props.row.minLength}}
                  </p>
                </b-field>
                <b-field label="默认值" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.defaultValues}}
                  </p>
                </b-field>
              </div>
              <div class="column">
                <b-field label="不可修改" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.required}}
                  </p>
                </b-field>
                <b-field label="最大值" horizontal class="static-field" v-show="props.row.type == 1">
                  <p class="control is-size-7">
                    {{ props.row.maxValue}}
                  </p>
                </b-field>
                <b-field label="最大长度" horizontal class="static-field" v-show="props.row.type == 2">
                  <p class="control is-size-7">
                    {{ props.row.maxLength}}
                  </p>
                </b-field>
                <b-field label="可能的值" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.possibleValues}}
                  </p>
                </b-field>
              </div>
              <div class="column">
                <b-field label="唯一性" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.required}}
                  </p>
                </b-field>
                <b-field label="正则" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.regex}}
                  </p>
                </b-field>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>


  </section>
</template>

<script>

  import {page, del} from '@/api/backend/meta'

  import EmptyTable from '@/components/EmptyTable.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.pageModel(this, page, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page != page) {
          this.loadAsyncData({page: page})
        }
      },
      doDelete (id) {
        const vm = this
        vm.deleteModel(vm, del, id, () => vm.loadAsyncData({page: vm.pagination.page}))
      }
    },
    created () {
      this.loadAsyncData()
    }
  }
</script>
