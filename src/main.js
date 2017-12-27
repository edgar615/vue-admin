// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@/styles/bulma-pageloader.css'
import '@/styles/bulma-timeline.css'
import zh_CN from '@/utils/zh-CN'
//Bue提供的表单水平布局在生成错误提示的时候不太友好，修改了源码，重新定义了一个
import JccField from '@/components/field'
import '@/styles/vars.scss' //自定义风格
import '@/styles/style.css'

Vue.config.productionTip = false

//弹框
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

//校验
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  delay: 500,
  dictionary: {
    zh_CN
  }
});
//Buefy组件
Vue.use(Buefy, {
  defaultIconPack: "fa"
})

Vue.component('jcc-field', JccField)
/*
 {
 defaultIconPack: "mdi" //Icon pack used internally and on the Icon component attribute — Material Design Icons or FontAwesome可选 	mdi, fa
 ,defaultContainerElement: "body"//Default container attribute for floating Notices (Toasts & Snackbars). Note that this also changes the position of the Notices from fixed to absolute. Meaning that the container should be fixed.
 ,defaultDialogConfirmText: "确定" //Default dialog confirmText attribute
 ,defaultDialogCancelText: '取消' //Default dialog cancelText attribute
 ,defaultSnackbarDuration: 3500 //Default snackbar duration attribute.
 ,defaultToastDuration: 2000 //Default toast duration attribute.
 ,defaultTooltipType : "is-primary" // Default tooltip type (color) attribute.可选 is-white, is-black, is-light, is-dark, is-primary, is-info, is-success, is-warning, is-danger, and any other colors you've set in the $colors list on Sass
 ,defaultTooltipAnimated : false //Default tooltip animated attribute.
 ,defaultInputAutocomplete: "on" //Default input autocomplete attribute.可选 on, off
 ,defaultDateFormatter:date.toLocaleDateString() //Default datepicker date-formatter attribute
 ,defaultDateParser:Date.parse(date) //Default datepicker date-parser attribute
 ,defaultDayNames: ["日", "一", "二", "三", "四", "五", "六"] //Default datepicker day-names attribute
 ,defaultMonthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"] //Default datepicker month-names attribute
 ,defaultFirstDayOfWeek : 0// 	Default datepicker first-day-of-week attribute
 ,defaultTimeFormatter: "HH:mm"//Default timepicker time-formatter attribute
 ,defaultTimeParser : "HH:mm"//Default time-parser attribute
 ,defaultModalScroll : "clip"//Default modal/dialog scroll attribute，可选：clip, keep
 }
 */
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
  } else {
    if (store.getters.token) {
      next()
    } else {
      next("/login")
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
