const randomPoint = () => {
  const min = 0
  const max = 100
  const x = Math.floor(Math.random() * (max + 1 - min) + min)
  const y = Math.floor(Math.random() * (max + 1 - min) + min)
  const z = Math.floor(Math.random() * (max + 1 - min) + min)
  console.log('randomPoint',{
    x,
    y,
    z,
  })
  return ({
    x,
    y,
    z,
  })
}
module.exports = randomPoint