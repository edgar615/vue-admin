import JccMetaInput from './MetaInput'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, JccMetaInput)
  }
}

use(Plugin)

export default Plugin

export {
  JccMetaInput
}
