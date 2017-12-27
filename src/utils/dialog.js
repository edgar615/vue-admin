export function deleteConfirm(vm, onConfirm) {
  // vm.$dialog.confirm({
  //   title : '注意',
  //   message: '确定要删除吗',
  //   cancelText: "否",
  //   confirmText: '是',
  //   type: 'is-danger',
  //   hasIcon: true,
  //   onConfirm: onConfirm
  // });
  const id = vm.$layer.confirm("确定要删除吗?", {
    title: '警告'
  }, ()  => {
    vm.$layer.close(id);
    onConfirm()
  });
}

export function successToast(vm, msg) {
  if (msg == undefined) {
    msg = "操作成功";
  }
  vm.$toast.open({
    duration: 1500,
    position: 'is-bottom',
    message: msg,
    type: 'is-success'
  })
}
