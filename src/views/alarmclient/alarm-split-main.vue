<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">警情分栏</p>
      </header>
      <section class="modal-card-body">
        <b-tabs type="is-toggle" size="is-small" position="is-centered" @change="changeSplit">
          <b-tab-item :label="split.name" v-for="split in splitList" :key="split.id"></b-tab-item>
          <b-tab-item label="新增分栏" icon="plus"></b-tab-item>
        </b-tabs>
        <div class="columns">
          <div class="column is-one-fifth">
          </div>
          <div class="column is-three-fifths">
            <b-field label="分栏名" horizontal>
              <p class="control">
                <b-input v-model="model.name" value="一级警情"></b-input>
              </p>
            </b-field>
            <b-field label="警情级别" horizontal>
              <b-select placeholder="选择级别" v-model="model.level">
                <option value="">
                  全部
                </option>
                <option value="1">
                  1级
                </option>
                <option value="2">
                  2级
               </option>
                <option value="3">
                  3级
               </option>
                <option value="4">
                  4级
                </option>
                <option value="5">
                  5级
                 </option>
              </b-select>
            </b-field>
            <b-field label="用户编号" horizontal>
              <p class="control">
                <b-input v-model="model.alarmUserCode" value=""></b-input>
              </p>
            </b-field>
            <b-field horizontal><!-- Label left empty for spacing -->
              <p class="control">
                <button class="button is-primary" @click="$parent.close()">
                  <b-icon icon="check-circle"></b-icon>
                  <span>保存</span>
                </button>
                <button class="button" @click="$parent.close()">
                  <b-icon icon="undo"></b-icon>
                  <span>关闭</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
  import AlarmHandle from '@/views/alarmclient/partials/alarm-handle'
  import AlarmCheck from '@/views/alarmclient/partials/alarm-check'
  import AlarmHistory from '@/views/alarmclient/partials/alarm-history'
  export default {
    data() {
        const splitList =[{id: 1,name: "一级警情", level: 1},
            {id: 2,name : "布撤防"},
            {id: 3,name: "逾时未设"},
            {id: 4,name: "重点单位"}];
      return {
        splitList,
        model: splitList[0]
      }
    },
    methods: {
      changeSplit(index) {
          if (index < this.splitList.length) {
              this.model = this.splitList[index];
          } else {
              this.model = {};
          }
      }
    }
  }
</script>

<style scoped>
  .modal-card {
    width: 960px;
  }
  .b-tabs {
    margin-bottom: 0px;
  }
</style>
