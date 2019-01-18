import {registerComponentProgrammatic, use} from '@/utils/helpers'

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(
          ('' + o[k]).length)))
    }
  }
  return fmt
}


/**
 * 时间戳转换为Date格式
 * @param timeStamp 1539412493814
 * @returns {*}  2018-10-13
 */
function formatToDate (timeStamp) {
  if (timeStamp === '' || timeStamp === undefined || timeStamp == null) {
    return ''
  } else {
    var date = new Date(timeStamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var str = y + '-' + m + '-' + d
    return str
  }
}

/**
 * 时间戳转换为DateTime格式
 * @param timeStamp 1539412493814
 * @returns {*} 2018-10-13 14:34:53
 */
function unixTimestampToDateTimeHMS (timeStamp) {
  if (timeStamp === '' || timeStamp === undefined || timeStamp == null) {
    return ''
  } else {
    var date = new Date(timeStamp * 1000)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var f = date.getMinutes()
    f = f < 10 ? ('0' + f) : f
    var s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s

    var str = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s
    return str
  }
}

/**
 * 时间戳转换为DateTime格式
 * @param timeStamp 1539412493814
 * @returns {*} 2018-10-13 14:34:53
 */
function formatToDateTimeHMS (timeStamp) {
  if (timeStamp === '' || timeStamp === undefined || timeStamp === null) {
    return ''
  } else {
    var date = new Date(timeStamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var f = date.getMinutes()
    f = f < 10 ? ('0' + f) : f
    var s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s

    var str = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s
    return str
  }
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getCurrentDate () {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    ' ' + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds()
  return currentdate
}

function getTimestamp () {
  var diffTime = window.sessionStorage.getItem('diffTime')
  var clientTime = new Date().getTime()
  var adjustTime = clientTime + parseInt(diffTime)
  return adjustTime
}

const Plugin = {
  install (Vue) {
    registerComponentProgrammatic(Vue, '$getTimestamp', getTimestamp)
    registerComponentProgrammatic(Vue, '$getCurrentDate', getCurrentDate)
    registerComponentProgrammatic(Vue, '$formatToDateTimeHMS',
      formatToDateTimeHMS)
    registerComponentProgrammatic(Vue, '$unixTimestampToDateTimeHMS',
      unixTimestampToDateTimeHMS)
    registerComponentProgrammatic(Vue, '$formatToDate', formatToDate)
  }
}

use(Plugin)

export default Plugin
