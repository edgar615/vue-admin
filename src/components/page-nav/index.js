import Vue from 'vue'
import PageNav from './PageNav'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, PageNav)
  }
}

use(Plugin)

export default Plugin

export {
  PageNav
}
