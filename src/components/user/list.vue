<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">姓名</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input" placeholder="Name" type="text">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">last_name</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input" placeholder="Name" type="text">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <button class="button"><span class="icon"><i class="fa fa-search"></i></span><span>查询</span></button>
        <button class="button is-danger" @click="checkedRows = []" :disabled="!checkedRows.length">
          <span class="icon"><i class="fa fa-close"></i></span><span>取消</span>
        </button>
      </div>
    </div>
    <b-table
      :data="isEmpty ? [] : tableData"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :mobile-cards="hasMobileCards"
      :checked-rows.sync="checkedRows"
      checkable>

      <template slot-scope="props">
        <b-table-column label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column label="First Name">
          {{ props.row.first_name }}
        </b-table-column>

        <b-table-column label="Last Name">
          {{ props.row.last_name }}
        </b-table-column>

        <b-table-column label="Date" centered>
          {{ new Date(props.row.date).toLocaleDateString() }}
        </b-table-column>

        <b-table-column label="Gender">
          {{ props.row.gender }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="sentiment_very_dissatisfied"
                size="is-large">
              </b-icon>
            </p>
            <p>无数据</p>
          </div>
        </section>
      </template>
    </b-table>
    <b-pagination
      :total="total"
      :current.sync="current"
      :order="order"
      :size="size"
      :simple="isSimple"
      :per-page="perPage">
    </b-pagination>
  </section>
</template>

<script>
  export default {
    data() {
      const tableData = [
        { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
        { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
        { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
        { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
        { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
      ]

      return {
        tableData,
        isEmpty: false,
        isBordered: true,
        isStriped: true,
        isNarrowed: false,
        isHoverable: true,
        isLoading: false,
        hasMobileCards: true,
        checkedRows: [tableData[1], tableData[3]],
        total: 2000,
        current: 10,
        perPage: 20,
        order: 'is-centered',
        size: '',
        isSimple: false
      }
    }
  }
</script>
