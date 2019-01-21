<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-select placeholder="类型" v-model="filters.type">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList(this, 'smsTplType')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-input v-model="filters.identifier" placeholder="标识符"></b-input>
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

            <b-table-column field="type" label="类型">
              {{ $dictText(this, 'smsTplType',props.row.type) }}
            </b-table-column>

            <b-table-column field="smsTplIdentifier" label="标识符">
              {{ props.row.smsTplIdentifier }}
            </b-table-column>

            <b-table-column field="signName" label="短信签名">
              {{ props.row.signName }}
            </b-table-column>

            <b-table-column field="smsTpl" label="短信模板">
              {{ props.row.smsTpl }}
            </b-table-column>

            <b-table-column field="expireSecond" label="过期时间">
              {{ props.row.expireSecond }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="onDelete(props.row.smsTplId)">
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
  import {page, del} from '@/api/sms/tpl'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/sms/tpl/add.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
      }
    },
    components: {
      EmptyTable, AddForm
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(this, page, params)
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
        const vm = this
        this.$deleteModel(vm, del, id,
          () => this.loadAsyncData())
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增模板',
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
