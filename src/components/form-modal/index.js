// 从buefy参考的
import Vue from 'vue'
import FormModal from './FormModal'

import {registerComponent, registerComponentProgrammatic, use} from '../../utils/helpers'

const FormModalProgrammatic = {
  open (params) {
    let content
    let parent
    if (typeof params === 'string') content = params

    const defaultParam = {
      programmatic: true,
      content
    }
    if (params.parent) {
      parent = params.parent
      delete params.parent
    }
    const propsData = Object.assign(defaultParam, params)
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const ModalComponent = vm.extend(FormModal)
    return new ModalComponent({
      parent,
      el: document.createElement('div'),
      propsData
    })
  }
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FormModal)
    registerComponentProgrammatic(Vue, '$formModal', FormModalProgrammatic)
  }
}

use(Plugin)

export default Plugin

export {
  FormModal
}
