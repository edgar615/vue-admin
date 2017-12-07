<template>
  <section>
    <b-field>
      <b-input placeholder="Search..." type="search" icon="magnify">
      </b-input>
      <p class="control">
        <button class="button is-info">Search</button>
      </p>
    </b-field>
    <b-field  position="is-right">
      <b-input placeholder="Search..." type="search" icon="magnify">
      </b-input>
      <p class="control">
        <button class="button is-info">Search</button>
      </p>
    </b-field>
    <b-field position="is-right">
      <button class="button field is-danger" @click="checkedRows = []"
              :disabled="!checkedRows.length">
        <b-icon icon="close"></b-icon>
        <span>Clear checked</span>
      </button>
    </b-field>
    <div class="field is-grouped is-grouped-right">
      <p class="control">
        <a class="button is-primary">
          Submit
        </a>
      </p>
      <p class="control">
        <a class="button is-light">
          Cancel
        </a>
      </p>
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
