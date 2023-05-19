'use strict'
const jsonData = require('./params.json')

const convert = (json) => {
  //параметры для конвертации
  const config = [
    ...jsonData,
    {
      unit: 'm',
      value_mm: 1000,
    },
    {
      unit: 'cm',
      value_mm: 10,
    },
    {
      unit: 'in',
      value_mm: 25.4,
    },
    {
      unit: 'ft',
      value_mm: 304.8,
    },
  ]
  const data = JSON.parse(json)
  // значения из запроса
  const {
    distance,
    convert_to
  } = data
  const {
    unit,
    value
  } = distance
  //проверка на число
  const checkValue = (value && isFinite(value)) ? value : 0
  //узнаю растояние в милиметрах
  const {
    value_mm
  } = config.find((e) => e.unit === unit)
  const answerMm = value_mm * checkValue
  //делю на значение в милиметрах
  //возмож лутше использовать коефициент ?
  const convertTo = config.find((e) => e.unit === convert_to)
  const answerEnd = (answerMm / convertTo.value_mm).toFixed(2)

  //формирую ответ
  const answer = JSON.stringify({
    unit: convert_to,
    checkValue: answerEnd
  })
  return answer
}
console.log(convert('{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}'))

module.exports = convert