'use strict'

/* идея заключается в том чтом, что узнав растояние от нулевой точки
 мы можно определить примерный размер куба в котором ноа находится.
 Gолучив даные о отдаленности точки от углов куба,
 и условно разделив куб на 8 кубов поменьше, можно сделать вывод.
 В каком именно менишем кубе находится эта точка.
 дальше действие повторяется продолжаются до тех пор
 пока зона для поиска не станет этой точкой:) */

/* функция получение растояния
искомая точка задана внутри этой функции */
const getDistance = require('./modules/getDistance')
const {
  calcSize,
  calcSizeEndChange,
  calcSizeStartChange,
  calcNotChangeSizeEnd
} = require('./modules/helpTransform')
//возврвщает индекс первого наийменьшего числа масива
const minIndex = require('./modules/minIndex')
const randomPoint = require('./modules/randomPoint')

const findDot = () => {
  // получаем рандомную точку
  const desiredPoint = randomPoint()
  /*Получаем дистанцию от (0 , 0 ,0) до точки*/
  const distanceFrom0 = getDistance(desiredPoint, {
    x: 0,
    y: 0,
    z: 0
  })
  /*получаем сторону куба , в ходе разсуждений можно понять
   что сторона куба не может біть больше чем растояние до точки
  Важно чтобы начиналось с четного числаб, связано с началом вычислений */
  const cubeEdge = Math.ceil(distanceFrom0) % 2 === 0 ? Math.ceil(distanceFrom0) : Math.ceil(distanceFrom0) + 1

  // поле поиска
  let space = {
    size: cubeEdge,
    xStart: 0,
    yStart: 0,
    zStart: 0,
    xEnd: cubeEdge,
    yEnd: cubeEdge,
    zEnd: cubeEdge,
  }
  // масив с точками переданых в функцию
  let logs = []
  // параметри каждого угла ссылка на координаты и функции трансформации пространства поиска
  // формирую шаблон для сборки правил [[0,1,1],[1,0,0],[1,0,1],[0,1,0],[1,1,0],[0,0,1],[1,1,1],[0,0,0]]
  for (let index = 0; index < 4; index++) {
    let arr = new Array(3).fill('')
    const newAarr = arr.map((e,i) => i === index ? 0 : 1)
    const mirrorArr = newAarr.map((e) =>  e === 1 ? 0 : 1)
    logs = logs.concat([newAarr])
    logs = logs.concat([mirrorArr])
  }
  //сборка параметров для каждого угла по шаблону
  const arrSizeFromCorner = logs.map((arr) => {
    const item = {
      x: arr[0] === 1 ? 'xStart' : 'xEnd' ,
      y: arr[1] === 1 ? 'yStart' : 'yEnd',
      z: arr[2] === 1 ? 'zStart' : 'zEnd',
      transform: (space) => {
        const mewSpace = {
          size: calcSize(space.size),
          xStart: arr[0] === 1 ? space.xStart : calcSizeStartChange(space.xStart, space.size),
          yStart: arr[1] === 1 ? space.yStart : calcSizeStartChange(space.yStart, space.size),
          zStart: arr[2] === 1 ? space.zStart : calcSizeStartChange(space.zStart, space.size),
          xEnd: arr[0] === 1 ? calcSizeEndChange(space.xEnd, space.size) : calcNotChangeSizeEnd(space.xEnd, space.size),
          yEnd: arr[1] === 1 ? calcSizeEndChange(space.yEnd, space.size) : calcNotChangeSizeEnd(space.yEnd, space.size),
          zEnd: arr[2] === 1 ? calcSizeEndChange(space.zEnd, space.size) : calcNotChangeSizeEnd(space.zEnd, space.size),
        }
        return mewSpace
      }
    }
    return item
  })

  /* Каждая итерация цикла замеряет растояния от углов зоны поиска к искомой точке
   и на основании етих результатов сужает зону поиска */
  for (let index = 0; space.size > 0.5; index++) {
    const newDisatnce = arrSizeFromCorner.map((e) => {
      const point = {
        x: space[e.x],
        y: space[e.y],
        z: space[e.z]
      }
      logs = logs.concat(point)
      return getDistance(desiredPoint, point)
    })
    const index = minIndex(newDisatnce)
    space = arrSizeFromCorner[index].transform(space)
  }

  return JSON.stringify({
    result: {
      random_point: {
        x: space.xStart,
        y: space.yStart,
        z: space.zStart
      },
      search_points: logs,
      calls: logs.length
    }
  })
}
console.log(findDot())

//TODO: придумать более интересный подсчет вызовов функции

module.exports = findDot