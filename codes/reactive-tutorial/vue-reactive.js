const effectStack = [] // [effect1, effect2, ...]
const targetMap = new WeakMap() // key: target, value: Map(key: key, value: Set(deps))
const computedMap = new WeakMap() // key: effect, value: computed instance

const createRef = val => {
  const refValue = {
    value: val
  }
  const handler = {
    get: function (target, key, receiver) {
      track(target, key)
      return Reflect.get(...arguments)
    },
    set: function (target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(...arguments)
    }
  }
  return new Proxy(refValue, handler)
}

// Record which function is reading this value
// Create a deps set for each target's key
const track = (target, key) => {
  const currentEffect = effectStack[effectStack.length - 1]
  if (currentEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    deps.add(currentEffect)
  }
}

// Trigger when ref value changes
const trigger = (target, key, value) => {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => {
        const computedInstance = computedMap.get(effect)
        computedInstance.dirty = true
      })
    }
  }
}

class ComputedImpl {
  _ref = undefined
  dirty = true
  constructor(fn) {
    this.fn = fn
    this._ref = createRef(fn())
  }
  get value() {
    // If the computed value is dirty, re-evaluate it
    if (this.dirty) {
      this._ref.value = this.fn()
      this.dirty = false
    }
    return this._ref.value
  }
  set value(val) {
    throw new Error('Computed value is readonly')
  }
}

const computed = fn => {
  try {
    effectStack.push(fn)
    const computedInstance = new ComputedImpl(fn)
    computedMap.set(fn, computedInstance)
    return computedInstance
  } finally {
    effectStack.pop()
  }
}
