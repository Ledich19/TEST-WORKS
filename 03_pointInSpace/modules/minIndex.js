const minIndex = (arr) => {
  var minIndex = arr.indexOf(Math.min.apply(null, arr))
  return minIndex
}
module.exports = minIndex