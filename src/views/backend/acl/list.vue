<template>
  <section>
    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-select placeholder="公司类型" v-model="filters.companyType">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList('companyType')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-input v-model="filters.resourceName" placeholder="资源名称"></b-input>
              <p class="control ml-1">
                <button class="button" @click="loadAsyncData({page: 1})">
                  <b-icon icon="magnify"></b-icon>
                  <span>查询</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </header>
      <div class="card-content">
        <b-table
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
        >

          <template slot-scope="props">

            <b-table-column field="companyType" label="公司类型">
              {{ $dictText('companyType',props.row.companyType) }}
            </b-table-column>

            <b-table-column field="resourceName" label="资源">
              {{ props.row.resourceName }}
            </b-table-column>

            <b-table-column field="operateType" label="操作类型">
              {{ operateTypeName(props.row.operateType) }}
            </b-table-column>

            <b-table-column field="prohibited" label="禁止">
              {{ $boolText(props.row.prohibited) }}
            </b-table-column>

            <b-table-column field="leftExpr" label="比较字段">
              {{ props.row.leftExpr }}
            </b-table-column>

            <b-table-column field="exprType" label="比较操作符">
              {{ $dictText('exprType',props.row.exprType) }}
            </b-table-column>

            <b-table-column field="rightExpr" label="比较值">
              {{ props.row.rightExpr }}
            </b-table-column>


            <b-table-column label="操作">
              <a @click="onDelete(props.row.aclConfigId)" :class="{'is-loading' : deleting}">
                删除
              </a>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </div>
    </div>


  </section>
</template>

<script>
  import {aclPage, deleteAcl} from '@/api/backend/acl'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/backend/acl/add.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      operateTypeName (operateType) {
        let array = []
        if ((operateType & 1) === 1) {
          array.push('读取')
        }
        if ((operateType & 2) === 2) {
          array.push('新增')
        }
        if ((operateType & 4) === 4) {
          array.push('修改')
        }
        if ((operateType & 8) === 8) {
          array.push('删除')
        }
        return array.join(',')
      },
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(aclPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      onDelete (id) {
        this.$deleteModel(deleteAcl, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增ACL',
          width: '20%',
          component: AddForm,
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
