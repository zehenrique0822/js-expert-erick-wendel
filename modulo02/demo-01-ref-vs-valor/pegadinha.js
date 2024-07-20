const assert = require("assert");


// Quando a gente muda o valor de uma propriedade de um objeto recebido por parâmetro,
// é possível observar a mudança do lado de fora da função.
function f1(obj) {
obj.a += 1;
assert.deepStrictEqual(obj, { a: 2 });
}
const obj1 = { a: 1 };
f1(obj1);
assert.deepStrictEqual(obj1, { a: 2 });


// Mas se a gente desestrutura o objeto, como abaixo, não não é mais possível observar
// a mudança do lado de fora da função, por mais que a mudança tenha ocorrido internamente.
function f2({ a }) {
a += 1;
assert.strictEqual(a, 2);
}
const obj2 = { a: 1 };
f2(obj2);
assert.deepStrictEqual(obj2, { a: 1 });


// Isso é porque desestruturar o objeto é equivalente a declarar uma variável local e copiar
// o valor dela, como abaixo:
function f3(obj) {
let a = obj.a;
a += 1;
assert.strictEqual(a, 2);
}
const obj3 = { a: 1 };
f3(obj3);
assert.deepStrictEqual(obj3, { a: 1 });