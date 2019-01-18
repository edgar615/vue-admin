export let DateUtils = {
  /**
   * 时间戳转换为Date格式
   * @param timeStamp 1539412493814
   * @returns {*}  2018-10-13
   */
  formatToDate: function (timeStamp) {
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
  },
  /**
   * 时间戳转换为DateTime格式
   * @param timeStamp 1539412493814
   * @returns {*} 2018-10-13 14:34:53
   */
  unixTimestampToDateTimeHMS: function (timeStamp) {
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
  },

  /**
   * 时间戳转换为DateTime格式
   * @param timeStamp 1539412493814
   * @returns {*} 2018-10-13 14:34:53
   */
  formatToDateTimeHMS: function (timeStamp) {
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
  },
  /**
   * 获取当前日期
   * @returns {string}
   */
  getCurrentDate: function () {
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
    var currentdate = date.getFullYear() + seperator1 + month + seperator1
      + strDate
      + ' ' + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds()
    return currentdate
  },

  getTimestamp: function () {
    var diffTime = window.sessionStorage.getItem('diffTime')
    var clientTime = new Date().getTime()
    var adjustTime = clientTime + parseInt(diffTime)
    return adjustTime
  }

}
export default DateUtils





