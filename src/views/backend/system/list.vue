<template>
  <section>
    <nav class="level page-content-top">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-input v-model="filters.sysIdentifier" placeholder="标识符"></b-input>
        </div>
        <div class="level-item">
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('systemType')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
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

    <div class="card">
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

            <b-table-column field="sorted" label="排序" numeric width="100">
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="标识符">
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="类型">
              {{ $dictText('systemType',props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="图标">
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="internal" label="内部访问?">
              <span class="tag" :class="internalClass(props.row.internal)">{{ $boolText(props.row.internal) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <a @click="viewModal(props.row.subsystemId)">
                查看
              </a>
              <a @click="editModal(props.row.subsystemId)">
                修改
              </a>
              <a @click="onDelete(props.row.subsystemId)">
                删除
              </a>
              <router-link
                  :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }" exact>
                菜单管理
              </router-link>
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
  import {deleteSystem, systemPage} from '@/api/backend/system'
  import AddForm from '@/views/backend/system/add.vue'
  import EditForm from '@/views/backend/system/edit.vue'
  import ViewForm from '@/views/backend/system/view.vue'

  export default {
    data() {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: []
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.$pageModelWithHistory(systemPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange(page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      /*
       * Type style in relation to the value
       */
      internalClass(value) {
        if (value === undefined) {
          return 'is-black'
        }
        if (value) {
          return 'is-success'
        }
        return 'is-dark'
      },
      onDelete(id) {
        this.$deleteModel(deleteSystem, id,
            () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal() {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增子系统',
          width: '30rem',
          component: AddForm,
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      },
      viewModal(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看子系统',
          width: '30rem',
          component: ViewForm,
          props: {
            systemId: id
          },
          showClose: true,
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      },
      editModal(id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改子系统',
          width: '30rem',
          component: EditForm,
          props: {
            systemId: id
          },
          onClose: () => {
            vm.loadAsyncData()
          }
        })
      }
    },
    created() {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
