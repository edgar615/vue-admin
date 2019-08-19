<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-input v-model="filters.name" placeholder="发货方式"></b-input>
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
              <span>新增</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="card  ">
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

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        pagination: {},
        loading: false,
        deleting: false
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.$pageModelWithHistory(shippingMethodPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange(page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },

      /***
       *清空
       * **/
      clearData() {
        let _this = this
        _this.filters = {}
      },
      /****
       *删除
       * **/
      deleteData(id) {
        this.$deleteModel(deleteShippingMethod, id, () => {
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
    created() {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
