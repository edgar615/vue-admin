const hasPermission = {
  install (Vue, options) {
    Vue.directive('hasPermission', {
      bind (el, binding, vnode) {
        let user = vnode.context.$store.getters.user
        if (user) {
          let permissionList = user.permissions
          if (permissionList && permissionList.length && !permissionList.includes(binding.value)) {
            if (el.parentNode) {
              el.parentNode.removeChild(el)
            } else {
              el.classList.add('is-hidden')
            }
          }
        }
      }
    })
  }
}
export default hasPermission
