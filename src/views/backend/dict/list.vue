<template>
  <section>
    <b-tabs class="mb-1">
      <b-tab-item label="字典列表" icon="magnify">
        <nav class="level page-topbar">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <b-input v-model="filters.code" placeholder="字典编码"></b-input>
            </div>
            <div class="level-item">
              <p class="control ml-1">
                <button class="button" @click="loadAsyncData({page: 1})">
                  <b-icon icon="magnify"></b-icon>
                  <span>查询</span>
                </button>
              </p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <div class="level-item">
              <div class="level-item">
                <button class="button is-primary" @click="addModal()">
                  <b-icon icon="plus-circle-outline"></b-icon>
                  <span>新增字典</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <b-table
            striped
            bordered
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
        >

          <template slot-scope="props">

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="dictCode" label="字典编码">
              {{ props.row.dictCode }}
            </b-table-column>

            <b-table-column field="defaultValue" label="默认值">
              {{ props.row.defaultValue }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.dictId)">
                修改
              </a>
              <a @click="onDelete(props.row.dictId)">
                删除
              </a>
              <router-link :to="{path:  '/backend/dict/' +props.row.dictId + '/items' }"  exact>
                字典子项
              </router-link>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </b-tab-item>

      <b-tab-item label="新增用户" icon="plus-circle-outline">

      </b-tab-item>

    </b-tabs>

  </section>
</template>

<script>
  import {dictPage, deleteDict} from '@/api/backend/dict'
  import AddForm from '@/views/backend/dict/add.vue'
  import EditForm from '@/views/backend/dict/edit.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(dictPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      /*
       * Handle sort event
       */
      onSort (field, order) {
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
      },
      onDelete (id) {
        const vm = this
        this.$deleteModel(deleteDict, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增字典',
          width: '30rem',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改字典',
          width: '30rem',
          component: EditForm,
          props: {
            dictId: id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
