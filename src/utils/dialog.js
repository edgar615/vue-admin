export function opConfirm (vm, msg, onConfirm) {
  vm.$dialog.confirm({
    title: '警告',
    message: msg,
    type: 'is-primary',
    // hasIcon: true,
    icon: 'alert-circle-outline',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: onConfirm
  })
}

export function successToast (vm, msg) {
  if (msg === undefined) {
    msg = '操作成功'
  }
  vm.$toast.open({
    duration: 1500,
    position: 'is-bottom',
    message: msg,
    type: 'is-success'
  })
}
