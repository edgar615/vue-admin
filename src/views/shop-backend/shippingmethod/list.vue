<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="wrap-box">
      <!--头部盒子-->
      <div class="message-box">
        <!--上部分盒子-->
        <div class="top-portion">
          <div class="Input-box">
            <b class="Input-title first-title">发货方式名称:</b>
            <b-input v-model="filters.name" class="input-custom"></b-input>

          </div>
        </div>
        <div class="bottom-btn">
          <button class="search-btn" @click="loadAsyncData({page: 1})">
            搜索
          </button>
          <button class="empty-btn" @click="clearData">
            清空
          </button>
        </div>
      </div>
      <div class="card mt-3 ">
        <header class="card-header">
          <div class="card-header-title">
            发货方式列表
            <div class="ml-3 buttons">
              <router-link to="/shop-backend/shippingmethod/add"
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
          >

            <template slot-scope="props">
              <b-table-column field="name" label="发货方式" centered>
                {{props.row.name}}
              </b-table-column>
              <b-table-column field="shippingCompanyName" label="物流公司" centered>
                {{ props.row.shippingCompanyName }}
              </b-table-column>
              <b-table-column field="contact" label="联系人" centered>
                {{ props.row.contact }}
              </b-table-column>
              <b-table-column field="contactNumber" label="联系电话" centered>
                {{ props.row.contactNumber}}
              </b-table-column>
              <b-table-column field="freight" label="创建时间" centered>
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>
              <b-table-column label="操作" centered>
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

    </div>
  </section>
</template>
<style>
  .label {
    height: 2rem;
    line-height: 2rem;
    color: #333333;
  }
</style>
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
