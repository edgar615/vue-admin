<template>
  <section>
    <nav class="level page-title">
      <!-- Left side -->
      <div class="level-left">
        <PageTitle></PageTitle>
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

            <b-table-column field="name" label="角色名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sorted" label="排序">
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.roleId)">
                修改
              </a>
              <a @click="onDelete(props.row.roleId)">
                删除
              </a>
              <a @click="permitModal(props.row.roleId)">
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
          width: '30rem',
          component: EditForm,
          props: {
            "roleId": id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增角色',
          width: '30rem',
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
          width: '60rem',
          component: PermitForm,
          props: {
            "roleId": id
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
