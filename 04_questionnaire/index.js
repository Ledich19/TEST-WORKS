const getQuestion = require('./getQuestion')

//===================================================================================
//ФУНКЦИЯ для тестирования
const testQuestionnaire = () => {
  //масив для записи последовательностей путей и обектом для первого вызова
  let paths = [
    [{
      id: '',
      question: '',
      answer: '',
      next: '1'
    }],
  ]
  //условие для работы цикла
  let testing = true

  while (testing) {
    //формирование нового масива на основе основного
    let newArr = []

    paths.forEach((e) => { // для каждого маршрута
      // проверка если следующего вопроса нету оставляет последовательность неизменной
      if (e[e.length - 1].next === '0') {
        newArr = newArr.concat([e])
        // инааче задается вопрос
      } else {
        const question = getQuestion({
          'answer': '',
          'next': e[e.length - 1].next
        })
        // условие если следующих вопросов нету записывает оба ответа
        if (question.answers[0].next === '0' && question.answers[1].next === '0') {
          const que = {
            id: question.id,
            question: question.question,
            answer: `${question.answers[0].answer} / ${question.answers[1].answer}`,
            next: '0'
          }
          newArr = newArr.concat([e.concat(que)])
          //иначе для каждого ответа создается свой путь
        } else {
          for (let i = 0; i < question.answers.length; i++) {
            const que = {
              id: question.id,
              question: question.question,
              answer: question.answers[i].answer,
              next: question.answers[i].next
            }
            newArr = newArr.concat([e.concat(que)])
          }
        }
      }
    })

    //если нету новых вариантов ответов завершает работу
    if (paths.length === newArr.length) {
      testing = false
    }
    //присваивает на место основного масива новосозданый
    paths = newArr
  }

  //конфигурация ответа
  const list = (paths.map((path) => {
    path.shift()
    const list = path.map((item) => {
      const obj = {}
      const ansver = item.answer
      obj[item.question] = ansver
      return obj
    })
    return list
  }))

  return JSON.stringify({
    paths: {
      nember: paths.length,
      list: list
    }
  })
}

//вывод ответа вконсоль
console.log(testQuestionnaire())