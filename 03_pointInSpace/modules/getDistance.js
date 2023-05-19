const getDistance = (dPoint, point) => {

  const ABX = Math.abs(dPoint.x - point.x)
  const ABY = Math.abs(dPoint.y - point.y)
  const ABZ = Math.abs(dPoint.z - point.z)

  const distance = Math.sqrt(Math.pow(ABX, 2) + Math.pow(ABY, 2)+ Math.pow(ABZ, 2))

  return distance
}
module.exports = getDistance


