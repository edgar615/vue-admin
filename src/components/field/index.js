import JccField from './Field'
import JccFieldBody from './FieldBody'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, JccField)
    registerComponent(Vue, JccFieldBody)
  }
}

use(Plugin)

export default Plugin

export {
  JccField,
  JccFieldBody
}
