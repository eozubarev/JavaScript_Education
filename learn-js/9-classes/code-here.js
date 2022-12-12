function A() {}
function B() {}
A.prototype = B.prototype = {};
let a = new A();

console.log( a instanceof B ); // true
console.log( a instanceof A ); //true
console.log(A.prototype == B.prototype); // true
console.log(A.__proto == B.__proto); // true
console.log(a.__proto__ == B.prototype); // true