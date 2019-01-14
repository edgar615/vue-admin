<template>
  <section>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title has-text-primary">短信模板</div>
        </div>
      </div>
    </div>
    <div class="notification">
      这里放每个页面的说明文字
    </div>
    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          <router-link to="/sms/tpl/add"
                       exact class="button is-primary">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </router-link>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.identifier" placeholder="标识符"></b-input>
              <p class="control ml-1">
                <button class="button is-primary" @click="loadAsyncData({page: 1})">
                  <b-icon icon="magnify"></b-icon>
                  <span>查询</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </header>
      <div class="card-content">

        <!--buefy的表格组件，具体用法查阅文档-->
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

            <b-table-column field="smsTplIdentifier" label="标识符" centered>
              {{ props.row.smsTplIdentifier }}
            </b-table-column>

            <b-table-column field="signName" label="短信签名" centered>
              {{ props.row.signName }}
            </b-table-column>

            <b-table-column field="smsTpl" label="短信模板" centered>
              {{ props.row.smsTpl }}
            </b-table-column>

            <b-table-column field="expireSecond" label="过期时间" centered>
              {{ props.row.expireSecond }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="onDelete(props.row.companyId)">
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
        this.pageModelWithHistory(this, page, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page != page) {
          this.loadAsyncData({page: page})
        }
      },
      onDelete (id) {
        del(id).then(response => {
          this.loadAsyncData({page: this.pagination.page})
        })
      }
    },
    created () {
      this.fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
