// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@/styles/style.css'
//import '@/styles/vars.scss' //自定义风格

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: "fa"
})

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
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
