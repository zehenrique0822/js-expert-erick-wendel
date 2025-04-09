999999999999999 // 16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false
3 > 2 > 1
// false
3 > 2 >= 1
// true 
"B" + "a" + + + "a" + "a"
//'BaNaNa'

// ---------------
console.assert(String(123) === '123', 'explicit convertion to string')
console.assert(123 + '' === '123', 'explicit convertion to string')

console.assert(('hello' || 123) === 'hello', "|| returns the first element if both are true")
console.assert(('hello' && 123) === 123, "&& returns the last element!")

// ----------------

const item = {
  name: 'José Henrique',
  age: 24,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 1 se não for primitivo, chama o toString
  valueOf() { 
    // return 007
    return {
      hey: 'dude'
    }
  },
  // Ele tem prioridade na parada!
  [Symbol.toPrimitive](coercionType) {
    // console.log('trying to covert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '008'
    }
    return types[coercionType] || types.string
  }
}

  // console.log('item', item + 0)
  // console.log('item', ''.concat(item) + 0)
  // console.log('toString', String(item))

// Vai retornar NaN pois o toString retornou a string
 // console.log('valueOf', Number(item))

// Depois de adicionar o toPrimitive
// console.log('toString', String(item))
// console.log('valueOf', Number(item))

// Chama a conversão default!
// console.log('new Date', new Date(item))

console.assert(item + 0 === '{"name":"José Henrique","age":24}0')
// console.assert('!!item is true?', !!item)
console.assert(!!item)
// console.log('string.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"José Henrique","age":24}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = {...item, name: 'Zézim', age: 20 }
// console.log(item2)

console.assert(item2.name === 'Zézim' && item2.age === 20)
