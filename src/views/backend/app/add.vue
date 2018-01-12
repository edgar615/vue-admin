<template>
    <section>
      <!--step-->
      <div id="wizard" class="swMain">
        <ul>
          <li>
            <a :class="stepClass(0)">
              <span class="stepNumber">
                1
            </span>
              <span class="stepDesc">
                选择服务提供商
               </span>
              <span class="stepDesc">
                  <small>{{spModel.name}}</small>
              </span>
            </a>
          </li>
          <li>
            <a :class="stepClass(1)">
              <span class="stepNumber">
                2
            </span>
              <span class="stepDesc"> 选择子系统</span>
              <span class="stepDesc">
                  <small>{{systemModel.name}}</small>
              </span>
            </a>
          </li>
          <li>
            <a :class="stepClass(2)">
              <span class="stepNumber">
                3
            </span>
              <span class="stepDesc"> 设置应用属性</span>
            </a>
          </li>
          <li>
            <a :class="stepClass(3)">
              <span class="stepNumber">
                4
            </span>
              <span class="stepDesc"> 完成</span>
            </a>
          </li>
        </ul>

      </div>
      <!--.step-->
      <SpSelector @onSelectSp="onSelectSp" v-show="step == 0"></SpSelector>
      <SystemSelector @onSelectSystem="onSelectSystem" v-show="step == 1" :applications="applications"></SystemSelector>
      <SystemField :systemId="systemModel.subsystemId" v-show="step == 2" ></SystemField>
    </section>
</template>
<script>
  import {applicationList} from '@/api/backend/sp';
  import SpSelector from '@/views/backend/partials/sp-selector.vue';
  import SystemSelector from '@/views/backend/partials/system-selector.vue';
  import SystemField from '@/views/backend/partials/system-field.vue';
  export default {
    data() {
      return {
          step : 0,
          spModel: {},
          systemModel: {},
          applications: [],
      }
    },
    components: {
      SpSelector,SystemSelector
    },
    computed: {

    },
    methods: {
      stepClass(index) {
        if (index < this.step) {
          return "done";
        }
        if (this.step == index) {
          return "selected";
        }
        return "";
      },
      onSelectSp(sp) {
          const vm = this;
        vm.step = 1;
        vm.spModel = sp;
//          applicationList(sp.companyCode).then(response => {
//            vm.applications = response.data;
//            vm.step = 1;
//            vm.spModel = sp;
//          })
      },
      onSelectSystem(system) {
        this.step = 2;
        this.systemModel = system;
      }
    },
    created() {
    }
  }
</script>
