<template>
  <section>
    <!--使用原生的columns实现的查询-->
    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">MAC地址</label>
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

    <!--使用buefy实现的查询，也可以用原生的bulma实现 group-multiline会自动换行-->
    <section>
      <b-field grouped position="is-left" group-multiline>
        <b-input v-model="query.name" placeholder="Name"></b-input>
        <b-select placeholder="Personal title" v-model="query.select">
          <option>Mr.</option>
          <option>Ms.</option>
        </b-select>
        <div class="block control" style="padding-top: 0.5rem">
          <b-checkbox v-model="query.checkboxGroup"
                      native-value="Silver">
            Silver
          </b-checkbox>
          <b-checkbox v-model="query.checkboxGroup"
                      native-value="Flint">
            Flint
          </b-checkbox>
          <b-checkbox v-model="query.checkboxGroup"
                      native-value="Vane">
            Vane
          </b-checkbox>
          <b-checkbox v-model="query.checkboxGroup"
                      native-value="Billy" disabled>
            Billy
          </b-checkbox>
        </div>
        <div class="block control" style="padding-top: 0.25rem">
          <b-radio v-model="query.radio"
                   native-value="Flint">
            Flint
          </b-radio>
          <b-radio v-model="query.radio"
                   native-value="Silver">
            Silver
          </b-radio>
          <b-radio v-model="query.radio"
                   native-value="Jack">
            Jack
          </b-radio>
          <b-radio v-model="query.radio"
                   native-value="Vane"
                   disabled>
            Vane
          </b-radio>
        </div>
      </b-field>
    </section>

    <section style="margin-top: 1rem">
      <b-field grouped>
        <b-field>
          <b-checkbox-button v-model="query.checkboxBotton"
                             native-value="Nop"
                             type="is-danger">
            <b-icon icon="close"></b-icon>
            <span>Nop</span>
          </b-checkbox-button>

          <b-checkbox-button v-model="query.checkboxBotton"
                             native-value="Yep"
                             type="is-success">
            <b-icon icon="check"></b-icon>
            <span>Yep</span>
          </b-checkbox-button>

          <b-checkbox-button v-model="query.checkboxBotton"
                             native-value="Default">
            Default
          </b-checkbox-button>

          <b-checkbox-button v-model="query.checkboxBotton"
                             native-value="Disabled"
                             disabled>
            Disabled
          </b-checkbox-button>
        </b-field>
        <b-field>
          <b-radio-button v-model="query.radioButton"
                          native-value="Nop"
                          type="is-danger">
            <b-icon icon="close"></b-icon>
            <span>Nop</span>
          </b-radio-button>

          <b-radio-button v-model="query.radioButton"
                          native-value="Yep"
                          type="is-success">
            <b-icon icon="check"></b-icon>
            <span>Yep</span>
          </b-radio-button>

          <b-radio-button v-model="query.radioButton"
                          native-value="Default">
            Default
          </b-radio-button>

          <b-radio-button v-model="query.radioButton"
                          native-value="Disabled"
                          disabled>
            Disabled
          </b-radio-button>
        </b-field>
      </b-field>
    </section>

    <section>
      <b-field grouped group-multiline>
        <div class="field" style="margin-top:  0.5rem">
          <b-switch>Default</b-switch>
        </div>
        <div class="field" style="margin-top:  0.5rem">
          <b-switch v-model="query.isSwitched">
            {{ query.isSwitched }}
          </b-switch>
        </div>
        <div class="field" style="margin-top: 0.5rem">
          <b-switch v-model="query.isSwitchedCustom"
                    true-value="Yes"
                    false-value="No">
            {{ query.isSwitchedCustom }}
          </b-switch>
        </div>
        <div class="field" style="margin-top:  0.5rem">
          <b-switch disabled>Disabled</b-switch>
        </div>
        <p class="control" style="margin-left:  0.5rem;">
          <button class="button is-primary">Search</button>
        </p>
      </b-field>
    </section>

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

      <!--header可以将太长的title用简写表示，如果不需要，直接删除-->
      <template slot-scope="props" slot="header">
        <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
          {{ props.column.label }}
        </b-tooltip>
      </template>
      <template slot-scope="props">
        <b-table-column label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="first_name" label="FN" meta="First Name">
          {{ props.row.first_name }}
        </b-table-column>

        <b-table-column label="Last Name">
          {{ props.row.last_name }}
        </b-table-column>

        <b-table-column label="Date" centered>
          {{ new Date(props.row.date).toLocaleDateString() }}
        </b-table-column>

        <b-table-column label="Gender">
          <b-icon :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
          </b-icon>
          {{ props.row.gender }}
        </b-table-column>
      </template>

      <!--无数据的显示-->
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

      <!--footer-->
      <template slot="footer">
        <div class="has-text-right">
          Footer
        </div>
      </template>

      <!--这个是单独的分页组件，实际上应该用table组件自带的分页-->
      <template slot="bottom-left">
        <b-pagination
          :total="total"
          :current.sync="current"
          :order="order"
          :size="size"
          :simple="isSimple"
          :per-page="perPage">
        </b-pagination>
      </template>
    </b-table>

  </section>
</template>

<script>
  export default
  {
    data()
    {
      const tableData = [
        {'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male'},
        {'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male'},
        {'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female'},
        {'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
        {'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female'}
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
        isSimple: false,
        query: {
          radio: 'Vane',
          radioButton: '',
          isSwitched: false,
          isSwitchedCustom: 'Yes',
          checkboxGroup: ["Flint"],
          checkboxBotton: []
        }
      }
    }
  }
</script>
