import Vue from 'vue'
import PageTitle from './PageTitle'

import {registerComponent, use} from '../../utils/helpers'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, PageTitle)
  }
}

use(Plugin)

export default Plugin

export {
  PageTitle
}
