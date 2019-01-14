<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.name" placeholder="发货方式"></b-input>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData({page: 1})">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>
      <div class="card mt-3 ">
        <header class="card-header">
          <div class="card-header-title">
            发货方式列表
          </div>
          <div class="card-header-right buttons">
            <router-link to="/shop-backend/shippingmethod/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增</span>
            </router-link>
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
              <b-table-column field="name" label="发货方式">
                {{props.row.name}}
              </b-table-column>
              <b-table-column field="shippingCompanyName" label="物流公司">
                {{ props.row.shippingCompanyName }}
              </b-table-column>
              <b-table-column field="contact" label="联系人">
                {{ props.row.contact }}
              </b-table-column>
              <b-table-column field="contactNumber" label="联系电话">
                {{ props.row.contactNumber}}
              </b-table-column>
              <b-table-column field="freight" label="创建时间">
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>
              <b-table-column label="操作">
                <router-link class="table-compile"
                             :to="{path:  '/shop-backend/shippingmethod/' +props.row.shippingMethodId +'/edit'}">
                  编辑
                </router-link>
                <a class="table-compile" @click="deleteData(props.row.shippingMethodId)">
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
  import {deleteShippingMethod, shippingMethodPage} from '@/api/shop-backend/shippingmethod'
  import EmptyTable from '@/components/EmptyTable.vue'

  export default {
    data () {
      return {
        filters: {
          name: ''
        },
        pagination: {},
        loading: false,
        deleting: false
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
        this.pageModelWithHistory(this, shippingMethodPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },

      /***
       *清空
       * **/
      clearData () {
        let _this = this
        _this.filters = {}
      },
      /****
       *删除
       * **/
      deleteData (id) {
        this.deleteModel(this, deleteShippingMethod, id, () => {
          this.loadAsyncData()
        })
      }
    },
    filters: {
      /**
       * Filter to truncate string, accepts a length parameter
       */
      /*
       truncate(value, length) {
       return value.length > length
       ? value.substr(0, length) + '...'
       : value
       }
       */
    },
    created () {
      this.fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
