import {deleteConfirm} from '@/utils/dialog'
import {DateUtils} from '@/utils/DateFormat'

function pageModel (vm, pageApi, params) {
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
    params.startTime = parseInt(new Date(vm.startTime).valueOf().toString()) / 1000
  }
  if (vm.endTime) {
    params.endTime = parseInt(new Date(vm.endTime).valueOf().toString()) / 1000
  }
  vm.loading = true
  return pageApi(params).then(response => {
    vm.pagination = response.data
    vm.loading = false
  }).catch(err => {
    vm.loading = false
  })
}

function getModel (vm, getApi, id) {
  vm.loading = true
  getApi(id).then(response => {
    vm.model = response.data
    vm.loading = false
  }).catch(err => {
    vm.loading = false
  })

}

function updateModel (vm, updateApi, id, callback) {
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      updateApi(id, vm.model).then(response => {
        vm.saving = false
        if (callback) {
          callback()
        }
      }).catch(err => {
        vm.saving = false
      })
    }
  })

}

function saveModel (vm, saveApi, callback) {
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      saveApi(vm.model).then(response => {
        vm.saving = false
        if (callback) {
          callback()
        }
      }).catch(err => {
        vm.saving = false
      })
    }
  })

}

function deleteModel (vm, delApi, id, callback) {
  deleteConfirm(vm, () => {
    vm.deleting = true
    delApi(id).then(response => {
      vm.deleting = false
      if (callback) {
        callback()
      }
    }).catch(err => {
      vm.deleting = false
    })
  })
}

function batchDeleteModel (vm, delApi, ids, callback) {
  deleteConfirm(vm, () => {
    vm.deleting = true
    delApi({data: {ids: ids}}).then(response => {
      vm.deleting = false
      if (callback) {
        callback()
      }
    }).catch(err => {
      vm.deleting = false
    })
  })

}

function regionText (regionCode) {
  const regionArray = this.$store.getters.region.filter(function (item) {
    return item.regionCode === regionCode
  })
  if (regionArray && regionArray.length > 0) {
    return regionArray[0].mergerName
  }
  return ''
}

function dictText (vm, name, value) {
  return this.$store.getters.dictText(name, value)
}

function dictList (vm, name) {
  return this.$store.getters.dictList(name)
}

function boolText (boolValue) {
  return customBoolText(boolValue, '是', '否')
}

function customBoolText (boolValue, trueText, falseText) {
  if (boolValue) {
    return trueText
  }
  return falseText
}

export default {
  install (Vue, options) {
    //区域
    Vue.prototype.regionText = regionText
    // bool的显示
    Vue.prototype.boolText = boolText
    Vue.prototype.customBoolText = customBoolText
    // 字典
    Vue.prototype.dictText = dictText
    Vue.prototype.dictList = dictList
    // 分页
    Vue.prototype.pageModel = pageModel
    // 查看
    Vue.prototype.getModel = getModel
    // 删除
    Vue.prototype.deleteModel = deleteModel
    //批量删除
    Vue.prototype.batchDeleteModel = batchDeleteModel
    // 新增
    Vue.prototype.saveMode = saveModel
    // 修改
    Vue.prototype.updateModel = updateModel
    Vue.prototype.DateUtils = DateUtils
  }
}
