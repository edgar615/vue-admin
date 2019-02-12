<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
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

            <b-table-column field="name" label="角色名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sorted" label="排序">
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.sysRoleId)">
                修改
              </a>
              <a @click="onDelete(props.row.sysRoleId)">
                删除
              </a>
              <a @click="permitModal(props.row.sysRoleId)">
                授权
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
  import {page, deleteRole} from '@/api/sys/role'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/sys/role/add.vue'
  import EditForm from '@/views/sys/role/edit.vue'
  import PermitForm from '@/views/backend/role/permit.vue'

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
        this.$pageModelWithHistory(page, params)
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
        this.$deleteModel(deleteRole, id,
            () => this.loadAsyncData())
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改角色',
          width: '20%',
          component: EditForm,
          props: {
            "sysRoleId": id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增角色',
          width: '20%',
          component: AddForm,
          props: {
            "parentId": -1
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      permitModal (id) {
        this.$formModal.open({
          parent: this,
          name: '角色授权',
          width: '50%',
          component: PermitForm,
          props: {
            "sysRoleId": id
          },
          onClose: () => { }
        })
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
