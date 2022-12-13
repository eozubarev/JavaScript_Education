const obj = {}
const anyNull = null
const anyUndefined = undefined
const arr = [];
const num = 123;
const str = 'string'

// копируем метод toString в переменную для удобства
const objectToString = Object.prototype.toString;

// toString
console.log( objectToString.call(obj) ); // [object Object]
console.log( objectToString.call(anyNull) ); // [object Null]
console.log( objectToString.call(anyUndefined) ); // [object Undefined]
console.log( objectToString.call(arr) ); // [object Array]
console.log( objectToString.call(num) ); // [object Number]
console.log( objectToString.call(str) ); // [object String]

// Преимущество toString от typeOf вы можем более явно увидить что у нас лежит
// typeOf
console.log(typeof obj) // object
console.log(typeof anyNull) // object
console.log(typeof anyUndefined) // undefined
console.log(typeof arr) // object
console.log(typeof num) // number
console.log(typeof str) // string

