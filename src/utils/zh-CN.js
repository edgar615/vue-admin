const messages = {
  after: (field, [target]) => ` ${field}必须在${target}之后`,
  alpha_dash: (field) => ` ${field}只能包含字母、数字、下划线_和破折号-`,
  alpha_num: (field) => ` ${field}只能包含字母、数字`,
  alpha_spaces: (field) => ` ${field}只能包含字母、数字和空格`,
  alpha: (field) => ` ${field}只能包含字母`,
  before: (field, [target]) => ` ${field}必须在${target}之前`,
  between: (field, [min, max]) => ` ${field}必须在${min}与${max}之间`,
  confirmed: (field, [confirmedField]) => ` ${field}必须和${confirmedField}相同`,
  date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间`,
  date_format: (field, [format]) => ` ${field}必须在在${format}格式中`,
  decimal: (field, [decimals = '*'] = []) => ` ${field}最多是精确到${decimals === '*' ? '' : decimals}位小数点的数字`,
  digits: (field, [length]) => ` ${field}必须是数字，且精确到${length}数`,
  dimensions: (field, [width, height]) => ` ${field}必须是${width}像素到${height}像素`,
  email: (field) => ` ${field}必须是有效的邮箱`,
  ext: (field) => ` ${field}必须是有效的文件`,
  image: (field) => ` ${field}必须是图片`,
  in: (field) => ` ${field}必须是一个有效值`,
  ip: (field) => ` ${field}必须是一个有效的IP地址`,
  max: (field, [length]) => ` ${field}不能大于${length}字符`,
  max_value: (field, [max]) => ` ${field}必须小于或等于${max}`,
  mimes: (field) => ` ${field}必须是有效的文件类型`,
  min: (field, [length]) => ` ${field}必须至少有${length} 字符`,
  min_value: (field, [min]) => ` ${field}必须大于或等于${min}`,
  not_in: (field) => ` ${field}必须是一个有效值`,
  numeric: (field) => ` ${field}只能包含数字字符`,
  regex: (field) => ` ${field}格式无效`,
  required: (field) => `请输入${field}`,
  size: (field, [size]) => ` ${field}必须小于${size}`,
  url: (field) => ` ${field}不是有效的url`,
  // 自定义
  alpha_underscore: (field) => ` ${field}只能包含字母、数字和下划线`,
  alpha_symbol: (field) => ` ${field}只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号`,
  china_mobile: (field) => ` 请输入正确的${field}`,
  menu: (field) => ` ${field}只能包含字母、数字和 / : 中的特殊符号`,
  remote: (field) => ` ${field}已存在`
}

const locale = {
  name: 'zh_CN',
  messages,
  attributes: {}
}

export default locale
