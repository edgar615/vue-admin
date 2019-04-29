import {registerComponentProgrammatic, use} from '@/utils/helpers'

function pageModel(pageApi, params) {
  const vm = this;
  if (params === undefined) {
    params = {}
  }
  // 如果表格没有排序，不需要这些操作
  var sort = vm.sortField
  if (sort) {
    if (vm.sortOrder === 'desc') {
      sort = '-' + sort
    }
    params.sort = sort
  }
  params = Object.assign(vm.filters, params)
  // 如果查询条件中包含时间查询
  if (vm.startTime) {
    params.startTime = parseInt(new Date(vm.startTime).valueOf().toString())
      / 1000
  }
  if (vm.endTime) {
    params.endTime = parseInt(new Date(vm.endTime).valueOf().toString()) / 1000
  }
  vm.loading = true
  return pageApi(params).then(response => {
    vm.pagination = response.data
    vm.loading = false
    return response.data
  }).catch(err => {
    vm.loading = false
    return Promise.reject(err)
  })
}

function pageModelWithHistory(pageApi, params) {
  const vm = this;
  if (params === undefined) {
    params = {}
  }
  // 如果表格没有排序，不需要这些操作
  var sort = vm.sortField
  if (sort) {
    if (vm.sortOrder === 'desc') {
      sort = '-' + sort
    }
    params.sort = sort
  }
  params = Object.assign(vm.filters, params)
  // 如果查询条件中包含时间查询
  if (vm.startTime) {
    params.startTime = parseInt(new Date(vm.startTime).valueOf().toString())
      / 1000
  }
  if (vm.endTime) {
    params.endTime = parseInt(new Date(vm.endTime).valueOf().toString()) / 1000
  }
  vm.loading = true
  return pageApi(params).then(response => {
    vm.$store.dispatch('saveListQueryHistory',
      {path: vm.$route.path, query: JSON.stringify(params)})
    vm.pagination = response.data
    vm.loading = false
    return response.data
  }).catch(err => {
    vm.loading = false
    return Promise.reject(err)
  })
}

function fillParamFromHistory() {
  if (this.$store.getters.queryHistory[this.$route.path]) {
    this.filters = JSON.parse(
      this.$store.getters.queryHistory[this.$route.path])
  }
}

function clearListQueryHistory() {
  this.$store.dispatch('saveListQueryHistory', {path: this.$route.path})
}

function getModel (getApi, id) {
  const vm = this;
  vm.loading = true
  return getApi(id).then(response => {
    vm.model = response.data
    vm.loading = false
    return response.data
  }).catch(err => {
    vm.loading = false
    return Promise.reject(err)
  })
}

// 因为save和update要校验，用promise有点麻烦
function updateModel (updateApi, id, callback, errHandler) {
  const vm = this;
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      updateApi(id, vm.model).then(response => {
        vm.saving = false
        if (callback) {
          callback(response)
        }
      }).catch(err => {
        vm.saving = false
        if (errHandler) {
          errHandler(err)
        }
      })
    }
  })
}

function saveModel ( saveApi, callback, errHandler) {
  const vm = this;
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      saveApi(vm.model).then(response => {
        vm.saving = false
        if (callback) {
          callback(response)
        }
      }).catch(err => {
        vm.saving = false
        if (errHandler) {
          errHandler(err)
        }
      })
    }
  })
}

function deleteModel (delApi, id, callback) {
  const vm = this;
  deleteConfirm(() => {
    vm.deleting = true
    delApi(id).then(response => {
      vm.deleting = false
      return response.data
    }).then(callback).catch(err => {
      vm.deleting = false
      return Promise.reject(err)
    })
  })
}

function confirmModel (delApi, id, msg, callback) {
  const vm = this;
  opConfirm(msg, () => {
    vm.deleting = true
    delApi(id).then(response => {
      vm.deleting = false
      return response.data
    }).then(callback).catch(err => {
      vm.deleting = false
      return Promise.reject(err)
    })
  })
}

function batchDeleteModel(delApi, ids, callback) {
  const vm = this;
  deleteConfirm(() => {
    vm.deleting = true
    delApi({data: {ids: ids}}).then(response => {
      vm.deleting = false
      return response.data
    }).then(callback).catch(err => {
      vm.deleting = false
      return Promise.reject(err)
    })
  })
}

function dictText(name, value) {
  return this.$store.getters.dictText(name, value)
}

function dictList(name) {
  return this.$store.getters.dictList(name)
}

function boolText(boolValue) {
  return customBoolText(boolValue, '是', '否')
}

function customBoolText(boolValue, trueText, falseText) {
  if (boolValue) {
    return trueText
  }
  return falseText
}


function opConfirm ( msg, callback) {
  Vue.prototype.$modal.show('dialog', {
    // title: 'Alert!',
    text: msg,
    buttons: [
      {
        title: '确定',
        handler: () => {
          callback()
          Vue.prototype.$modal.hide('dialog');
        }
      },
      {
        title: '取消',
        default: true //回车激活
      }
    ]
  })
}

function deleteConfirm (callback) {
  Vue.prototype.$modal.show('dialog', {
    // title: 'Alert!',
    text: '确定要删除吗？',
    buttons: [
      {
        title: '删除',
        handler: () => {
          callback()
          Vue.prototype.$modal.hide('dialog');
        }
      },
      {
        title: '取消',
        default: true //回车激活
      }
    ]
  })
}

function successToast (msg) {
  if (msg === undefined) {
    msg = '操作成功'
  }
  Vue.notify({
    group: 'notification',
    type: 'success',
    text: msg
  })
  // Vue.prototype.$swal({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   width: 300,
  //   type: 'success',
  //   title: '操作成功'
  // });
}

function contains (array, obj) {
  let i = array.length
  while (i--) {
    if (array[i] === obj) {
      return true
    }
  }
  return false
}
function removeArray (array, element) {
  const index = array.indexOf(element)
  if (index !== -1) {
    array.splice(index, 1)
  }
}

const Plugin = {
  install(Vue) {
    // bool的显示
    registerComponentProgrammatic(Vue, '$boolText', boolText)
    registerComponentProgrammatic(Vue, '$customBoolText', customBoolText)

    // 字典
    registerComponentProgrammatic(Vue, '$dictText', dictText)
    registerComponentProgrammatic(Vue, '$dictList', dictList)

    // dialog
    registerComponentProgrammatic(Vue, '$opConfirm', opConfirm)
    registerComponentProgrammatic(Vue, '$deleteConfirm', deleteConfirm)
    registerComponentProgrammatic(Vue, '$successToast', successToast)

    // api
    registerComponentProgrammatic(Vue, '$pageModel', pageModel)
    registerComponentProgrammatic(Vue, '$pageModelWithHistory',
      pageModelWithHistory)
    registerComponentProgrammatic(Vue, '$fillParamFromHistory',
      fillParamFromHistory)
    registerComponentProgrammatic(Vue, '$clearListQueryHistory',
      clearListQueryHistory)
    registerComponentProgrammatic(Vue, '$getModel', getModel)
    registerComponentProgrammatic(Vue, '$deleteModel', deleteModel)
    registerComponentProgrammatic(Vue, '$batchDeleteModel', batchDeleteModel)
    registerComponentProgrammatic(Vue, '$saveModel', saveModel)
    registerComponentProgrammatic(Vue, '$updateModel', updateModel)
    registerComponentProgrammatic(Vue, '$confirmModel', confirmModel)

    registerComponentProgrammatic(Vue, '$arrayContains', contains)
    registerComponentProgrammatic(Vue, '$removeArray', removeArray)
  }
}

use(Plugin)

export default Plugin
