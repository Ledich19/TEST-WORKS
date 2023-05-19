const sort_by = (data, rule, filters) => {

  if (rule === 'sort_by') {
    // скопировал обект так как sort меняет обект
    let items = JSON.parse(JSON.stringify(data))
    /* сортировка приналичии двух параметров производится по первоме как основному
и второму как дополнительному
пример результата: ghb ['name', 'value']
  { name: 'And', value: 3 },
  { name: 'And', value: 5 },
  { name: 'And', value: 55 },
  { name: 'Edward', value: 21 },
*/
    items.sort(function (a, b) {
      if (a[filters[0]] > b[filters[0]]) {
        return 1
      }
      if (a[filters[0]] < b[filters[0]]) {
        return -1
      }
    }).sort(function (a, b) {
      if (a[filters[0]] >= b[filters[0]] && a[filters[1]] > b[filters[1]]) {
        return 1
      }
      if (a[filters[0]] <= b[filters[0]] && a[filters[1]] < b[filters[1]]) {
        return -1
      }
      return 0
    })

    return items

  } else {
    return data
  }
}

module.exports = sort_by
