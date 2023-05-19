'use strict'
//запросы
const get = async (url) => {
  let res = await fetch(url)
  return await res.json()
}
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  })
  return await res.json()
}

const start = async () => {
  const fromSelect = document.getElementById('from')
  const toSelect = document.getElementById('to')
  const valueInput = document.getElementById('value')
  const result = document.getElementById('result')

  const config = await get('http://localhost:3002/config')
  //создаются списки длинн
  const list = []
  config.forEach((e) => {
    list.push(`<option value="${e.unit}">${e.unit}</option>`)
  })
  fromSelect.innerHTML = list
  toSelect.innerHTML = list
  //Отправление с даными
  const hendleConvert = async () => {
    const params = {
      distance: {
        unit: fromSelect.value,
        value: valueInput.value
      },
      convert_to: toSelect.value
    }
    const ansver = await postData('http://localhost:3002/convert', JSON.stringify(params))
    result.innerHTML = JSON.parse(ansver).checkValue
  }
  //обработчики
  fromSelect.onchange = function () {
    hendleConvert()
  }
  toSelect.onchange = function () {
    hendleConvert()
  }
  valueInput.onchange = function () {
    hendleConvert()
  }

}
start()

const getDot = document.getElementById('getDot')
const reslutDot = document.getElementById('reslutDot')
getDot.onclick = async function () {
  const ansver = await get('http://localhost:3002/dot')
  const result = JSON.parse(ansver).result
  reslutDot.innerHTML = `
  <div>random_point ${JSON.stringify(result.random_point)}</div>
  <div>calls ${JSON.stringify(result.calls)}</div>
  <div>search_points ${JSON.stringify(result.search_points)}</div>
  `
}