const calcSize = (size) => {
  return ((size / 2) % 2 !== 0) && (Math.floor(size / 2) > 1) ? Math.floor(size / 2) + 1 : (size / 2)
}
const calcSizeEndChange = (sizeEnd ,size) => {
  return  sizeEnd - (((size / 2) % 2 !== 0) && (Math.floor(size / 2) > 1) ? Math.floor(size / 2) - 1: Math.ceil(size / 2))
}
const calcNotChangeSizeEnd = (sizeEnd ,size) => {
  return  ((size / 2) % 2 !== 0) && (Math.floor(size / 2) > 1) ? sizeEnd + 1 : sizeEnd
}
const calcSizeStartChange = (sizeStart ,size) => {
  return  sizeStart + (Math.floor(size / 2) > 1 ? Math.floor(size / 2) : 1)
}

module.exports = {
  calcSize,
  calcSizeEndChange,
  calcSizeStartChange,
  calcNotChangeSizeEnd
}