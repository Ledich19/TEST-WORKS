const jsonData = require('./questions.json')

const getQuestion = (request) => {
  //вариант чтобы начать
  if (request === 'start') {
    const question = jsonData.guestions[0]
    return question
  }
  //поиск следуещего вопросавзависимости от ответа
  const question = jsonData.guestions.find((e) => {
    return e.id === request.next.toString()
  })
  //небольшая обработка если нету
  return question ? question : 'end'
}

module.exports = getQuestion