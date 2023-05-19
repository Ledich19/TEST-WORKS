const exclude = ( data, rule, filters ) => {
  //проверка на действие если не правильнове возвращает
  // возможно лутше сделать свичами в приложении 🤔
  if (rule === 'exclude') {
    const filterArr = (element, filters) => {
      for (let i = 0; i < filters.length ; i++) {
        if (element.includes(filters[i])) {
          return false
        }
      }
      return true
    }
    /* Преобразует каждый елемент колекции в строку
     и передает строку и параметры функции которая
     проверяет есть ли каждый из параметров в обекте
     и возврвщает true или false
     */
    let newData = data.filter((e) => {
      const eee = JSON.stringify(e)
      return filterArr(eee, filters )
    })
    return newData
  } else {
    return data
  }
}

module.exports = exclude