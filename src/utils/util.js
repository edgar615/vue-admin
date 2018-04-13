import request from '@/utils/request'
import {deleteConfirm} from '@/utils/dialog';

function pageModel(vm, pageApi, params) {
  if (params == undefined) {
    params = {};
  }
  //如果表格没有拍下，不需要这些操作
  var sort = vm.sortField;
  if (sort) {
    if (vm.sortOrder == 'desc') {
      sort = "-" + sort;
    }
    params.sort = sort;
  }
  params = Object.assign(vm.filters, params);
  vm.loading = true
  return pageApi(params).then(response => {
    vm.pagination = response.data;
    vm.loading = false;
  }).catch(err => {
    vm.loading = false;
  })
}

function getModel(vm, getApi, id) {
  vm.loading = true
  getApi(id).then(response => {
    vm.model = response.data;
    vm.loading = false;
  }).catch(err => {
      vm.loading = false;
  });

}

function updateModel(vm, updateApi, id, callback) {
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      updateApi(id, vm.model).then(response => {
        vm.saving = false;
      if (callback) {
        callback()
      }
    }).catch(err =>{
        vm.saving = false;
    })
    }
  });

}

function saveModel(vm, saveApi, callback) {
  vm.$validator.validateAll().then((result) => {
    if (result) {
      vm.saving = true
      saveApi(vm.model).then(response => {
        vm.saving = false;
        if (callback) {
          callback()
        }
    }).catch(err =>{
        vm.saving = false;
    })
    }
  });

}

function deleteModel(vm, delApi, id, callback) {
  deleteConfirm(vm, () => {
    vm.deleting = true;
    delApi(id).then(response => {
      vm.deleting = false;
      if (callback) {
        callback()
      }
    }).catch(err => {
        vm.deleting = false;
    })
  })
}

function batchDeleteModel(vm, delApi, ids, callback) {
  deleteConfirm(vm, () => {
    vm.deleting = true;
    delApi({data: {ids: ids}}).then(response => {
      vm.deleting = false;
      if (callback) {
        callback()
      }
    }).catch(err => {
        vm.deleting = false;
    })
  })

}

function dictText( vm, name, value) {
  return this.$store.getters.dictText(name, value);
}
function dictList( vm, name) {
  return this.$store.getters.dictList(name);
}

export default{
  install(Vue, options)
  {
    //字典
    Vue.prototype.dictText = dictText
    Vue.prototype.dictList = dictList
    //分页
    Vue.prototype.pageModel = pageModel
    //查看
    Vue.prototype.getModel= getModel
    //删除
    Vue.prototype.deleteModel = deleteModel
    //批量删除
    Vue.prototype.batchDeleteModel = batchDeleteModel
    //新增
    Vue.prototype.saveMode= saveModel
    //修改
    Vue.prototype.updateModel= updateModel
  }
}
