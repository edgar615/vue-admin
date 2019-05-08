import Vue from 'vue'
import EmptyTable from './EmptyTable'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, EmptyTable)
  }
}

use(Plugin)

export default Plugin

export {
  EmptyTable
}
