// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/styles/bulma-timeline.css'
import zh_CN from '@/utils/zh-CN'
import '@/styles/vars.scss'

import '@/utils/date'
// CRUD基本方法，减少页面开发量
import ApiUtil from '@/utils/util'
// 校验
import '@/utils/validate'
// Bue提供的表单水平布局在生成错误提示的时候不太友好，修改了源码，重新定义了一个
import JccField from '@/components/field'
import JccMetaInput from '@/components/meta'
import DictRadioButton from '@/components/dict'
import FormModal from '@/components/form-modal'

Vue.component('jcc-field', JccField)
Vue.component('jcc-meta-input', JccMetaInput)
Vue.component('dict-radio-button', DictRadioButton)

Vue.config.productionTip = false

Vue.use(ApiUtil)

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  delay: 500,
  dictionary: {
    zh_CN
  }
})

// Buefy组件，新版本两个方式都不起作用，等官方文档更新后在调试
// Vue.use(Buefy, {
//   defaultDayNames: ['日', '一', '二', '三', '四', '五', '六'],
//   defaultMonthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
// })
// 0.6.7版本后上面的方法不起作用，官方文档也没有给出说明，下面的方法的自己试验出来的
Vue.prototype.$buefy.setOptions({
  defaultDialogConfirmText: '确定',
  defaultDialogCancelText: '取消',
  defaultSnackbarDuration: 3500,
  defaultToastDuration: 2000,
  defaultDayNames: ['日', '一', '二', '三', '四', '五', '六'],
  defaultMonthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
    '十月', '十一月', '十二月'],
  defaultDateFormatter: date => date.format('yyyy-MM-dd')
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
