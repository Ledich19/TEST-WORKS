'use strict'
const include = require('./modules/filterIncludeModele')
const exclude = require('./modules/filterExcludeModele')
const sort_by = require('./modules/sortByParamsModule')

const test = `{'data': [{'user': 'mike@mail.com', 'rating': 20, 'disabled': false},
{'user': 'greg@mail.com', 'rating': 14, 'disabled': false},
{'user': 'john@mail.com', 'rating': 25, 'disabled': true}],
'condition': {'exclude': [{'disabled': true}], 'sort_by': ['rating']}}`

const sortApp = (inParams) => {
  //Распарсил в обект
  const {
    data,
    condition
  } = JSON.parse(inParams)
  // получил ключи и назначил их переменным
  const keysOb = Object.keys(condition) //[ 'include', 'sort_by' ]
  const [filterRule, sortRule] = keysOb
  // преобразует в масив обектов в масив строк обрезая скобки
  const filters = condition[filterRule] // [{'name': 'John'}],
    .map((e) => JSON.stringify(e).slice(1, -1)) //['name: John']
  const sortRules = condition[sortRule] //['email']}}

  // такая система чтобы можно было применить модули один за другим :)
  // и красиво выглядело:D
  let newData = {
    data: data,
    logData: function logThis() {
      console.log(this.data)
    },
    useModule: function useModule(module, ...params) {
      this.data = module(this.data, ...params)
    }
  }
  /*модули для фильтрации
   первым аргументом передается модуль
   вторым название действия
   и набор ключей*/
  newData.useModule(include, filterRule, filters)
  newData.useModule(exclude, filterRule, filters)
  //модули для сортировка максимум 2 параметра
  newData.useModule(sort_by, sortRule, sortRules)

  // Преобразование в json и возврат даных
  return JSON.stringify({
    result: newData.data
  })
}
console.log(sortApp(test))