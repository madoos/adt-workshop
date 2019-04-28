const construct = (Constructor) => {
  const wrappedConstructor = (...args) => new Constructor(...args)

  Object.getOwnPropertyNames(Constructor).filter(prop => typeof Constructor[prop] === "function").forEach((method) => {
    wrappedConstructor[method] = Constructor[method]
  })

  return wrappedConstructor
}

module.exports = {
  construct
}