class Fibonacci {
  *execute(input, current = 0, next = 1) {
  //processou todas as sequencias e para!
    if (input === 0) {
      return
    }
    yield current
  // com * delega a função mas nao retorna valor
    yield * this.execute(input -1, next, current + next)
  }
}

module.exports = Fibonacci