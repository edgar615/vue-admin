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
      <SystemSelector :companyId="companyId" @onSelectSystem="onSelectSystem" v-show="step == 1" :applications="applications"></SystemSelector>
      <SystemField @onCreateApp="onCreateApp" :companyCode="spModel.companyCode" :model="systemModel" :systemId="systemId" v-show="step == 2" ></SystemField>
      <ApplicationField  :applicationId="applicationId" v-show="step == 3" ></ApplicationField>
    </section>
</template>
<script>
  import {applicationList} from '@/api/company';
  import SpSelector from '@/views/application/partials/sp-selector.vue';
  import SystemSelector from '@/views/application/partials/system-selector.vue';
  import SystemField from '@/views/application/partials/system-field.vue';
  import ApplicationField from '@/views/application/partials/application-field.vue';
  export default {
    data() {
      return {
          step : 0,
          spModel: {},
          systemModel: {},
          applications: [],
          companyId : -1,
          systemId: -1,
          applicationId: -1
      }
    },
    components: {
      SpSelector,SystemSelector,SystemField,ApplicationField
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
          vm.companyId = sp.companyId;
         applicationList(sp.companyId).then(response => {
           vm.applications = response.data;
           vm.step = 1;
           vm.spModel = sp;
         })
      },
      onSelectSystem(system) {
        this.step = 2;
        this.systemModel = system;
        this.systemId = system.subsystemId
      },
      onCreateApp(appId) {
        this.step = 3;
        this.applicationId = appId;
      }
    },
    created() {
    }
  }
</script>
