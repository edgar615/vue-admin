const getters = {
  dictList: (state) => (dictName, dictValue) => {
  if (state.dict.data[dictName] == undefined) {
    return [];
  }
  return state.dict.data[dictName];
},
  dictText: (state) => (dictName, dictValue) => {
    if (state.dict.data[dictName] == undefined) {
      return "";
    }
    var items = state.dict.data[dictName];
    var dictText = "";
    items.forEach(function(item, index, input) {
      if (item.value == dictValue) {
          dictText = item.text;
      }
    });
    return dictText;
  }
}
export default getters
