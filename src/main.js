import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/styles/bulma-timeline.css'
import zh_CN from '@/utils/zh-CN'
import '@/styles/vars.scss'

import '@/utils/date'
import '@/utils/apiHelper'
// 校验
import '@/utils/validate'
// Bue提供的表单水平布局在生成错误提示的时候不太友好，修改了源码，重新定义了一个
import '@/components/field'
import '@/components/dict'
import '@/components/page-title'
import '@/components/empty-table'
import '@/components/form-modal'

import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'
Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  delay: 500,
  dictionary: {
    zh_CN
  }
})

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
