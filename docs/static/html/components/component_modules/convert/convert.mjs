let covert = {}
covert = {}
covert['pixelToVH'] = function (value) {
  // console.log('pixelToVH', value, `=>`, `${(100 * value) / window.innerHeight}vh`)
  return ((100 * value) / window.innerHeight)
}
covert['pixelToVW'] = function (value) {
  // console.log('pixelToVW', value, `=>`, `${(100 * value) / window.innerWidth}vw`)
  return ((100 * value) / window.innerWidth)
}
covert['vhToPixel'] = function (value) {
  // console.log('vhToPixel', value, `=>`, `${(window.innerHeight * value) / 100}px`)
  return ((window.innerHeight * value) / 100)
}
covert['vwToPixel'] = function (value) {
  // console.log('vwToPixel', value, `=>`, `${(window.innerWidth * value) / 100}px`)
  return ((window.innerWidth * value) / 100)
}
covert['clearnPx'] = function (value) {
  // console.log('clearnPx', value, `=>`, `${value}`)
  value = value.substr(0, value.length - 2)
  return value
}

async function init (obj) {
  // console.log(`a{['system'])init-${obj}`, obj)
  return covert
}

export default {
  init: obj => { return init(obj) }
}
