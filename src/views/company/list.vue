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
              <b-input v-model="filters.companyCode" placeholder="编码"></b-input>
              <b-input v-model="filters.name" placeholder="名称"></b-input>
              <b-field>
                <b-radio-button v-model="filters.state"
                                native-value="1"
                                type="is-success">
                  <b-icon icon="lock-open-outline"></b-icon>
                  <span>活动</span>
                </b-radio-button>
                <b-radio-button v-model="filters.state"
                                native-value="2"
                                type="is-dark" class="is-dark-blue-lighter">
                  <b-icon icon="lock-outline"></b-icon>
                  <span>锁定</span>
                </b-radio-button>
                <b-radio-button v-model="filters.state"
                                native-value="">
                  全部
                </b-radio-button>
              </b-field>
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

          detailed
          detail-key="companyId"
        >

          <template slot-scope="props">

            <b-table-column field="companyCode" label="公司编码">
              {{ props.row.companyCode }}
            </b-table-column>

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              <span class="tag" :class="stateClass(props.row.state)">{{ $dictText(this, 'companyState',props.row.state) }}</span>
            </b-table-column>

            <b-table-column field="state" label="类型">
              {{ $dictText(this, 'companyType',props.row.type) }}
            </b-table-column>

            <b-table-column field="name" label="添加时间">
              {{ $unixTimestampToDateTimeHMS(props.row.addOn) }}
            </b-table-column>

            <b-table-column field="name" label="管理员">
              {{ props.row.username }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.companyId)">
                修改
              </a>
              <a @click="doLock(props.row.companyId)" v-show="props.row.state == 1">
                锁定
              </a>
              <a @click="doUnLock(props.row.companyId)" v-show="props.row.state == 2">
                解锁
              </a>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
          <template slot="detail" slot-scope="props">
            <div class="columns is-size-7">
              <div class="column">
                <b-field label="地址" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.address}}
                  </p>
                </b-field>
                <b-field label="主页" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.homepage}}
                  </p>
                </b-field>
                <b-field label="热线电话" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.hotline}}
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
  import {page, lock, unLock} from '@/api/company'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/company/add.vue'
  import EditForm from '@/views/company/edit.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
      }
    },
    components: {
      EmptyTable, AddForm, EditForm,
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
        if (this.pagination.page != page) {
          this.loadAsyncData({page: page})
        }
      },
      stateClass (value) {
        if (value == undefined) {
          return 'is-black'
        }
        if (value == 1) {
          return 'is-success'
        }
        return 'is-dark'
      },
      doLock (id) {
        lock(id).then(response => {
          this.loadAsyncData({page: this.pagination.page})
        })
      },
      doUnLock (id) {
        unLock(id).then(response => {
          this.loadAsyncData({page: this.pagination.page})
        })
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增公司',
          width: '20%',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改公司',
          width: '20%',
          component: EditForm,
          props: {
            companyId: id
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
