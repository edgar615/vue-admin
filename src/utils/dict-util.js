var loadDict = function (store) {
  return new Promise((resolve, reject) => {
    store.dispatch('LoadAllDict').then(res => {
      return resolve(res.data)
    }).catch(err => {
      return reject(err)
    })
  })
}

export default loadDict
