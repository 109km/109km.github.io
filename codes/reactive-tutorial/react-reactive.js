const states = []
let stateIndex = 0

const useState = initValue => {
  const currentIndex = stateIndex
  stateIndex++

  if (states[currentIndex] === undefined) {
    states[currentIndex] = initValue
  }
  const value = () => states[currentIndex]
  const update = val => {
    states[currentIndex] = val
  }
  return [value, update]
}

// Mock react render function, after render `stateIndex` is set to 0
const mockRender = fn => {
  fn && fn()
  stateIndex = 0
}
