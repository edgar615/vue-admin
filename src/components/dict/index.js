import DictRadioButton from './DictRadioButton'
import DictCheckboxButton from './DictCheckboxButton'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, DictRadioButton)
    registerComponent(Vue, DictCheckboxButton)
  }
}

use(Plugin)

export default Plugin

export {
  DictRadioButton,
  DictCheckboxButton
}
