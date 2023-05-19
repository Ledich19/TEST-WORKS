const include = ( data, rule, filters ) => {
  // то же самій принцип что и в filterExcludeModele только на исключение
  if (rule === 'include') {
    const filterArr = (element, filters) => {
      for (let i = 0; i < filters.length ; i++) {
        if (!element.includes(filters[i])) {
          return false
        }
      }
      return true
    }
    let newData = data.filter((e) => {
      const eee = JSON.stringify(e)
      return filterArr(eee, filters )
    })
    return newData
  } else {
    return data
  }
}

module.exports = include