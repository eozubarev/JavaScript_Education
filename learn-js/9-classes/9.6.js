// Проверка класса: "instanceof"

/*
    Оператор instanceof позволяет проверить,
    принадлежит ли объект указанному классу, с учётом наследования.
 */

class Rabbit {}
const rabbit = new Rabbit();

// это объект класса Rabbit?
console.log( rabbit instanceof Rabbit ); // true


/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */


// вместо класса
function Rabbit() {}

console.log( new Rabbit() instanceof Rabbit ); // true



// …И для встроенных классов, таких как Array:
const arr = [1, 2, 3];
console.log( arr instanceof Array ); // true
console.log( arr instanceof Object ); // true
//  arr также принадлежит классу Object, потому что Array наследует от Object.

// оператор instanceof просматривает для проверки цепочку прототипов.


class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
console.log(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (нет совпадения)
// rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)


/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */


// Symbol.hasInstance

// проверка instanceof будет полагать,
// что всё со свойством canEat - животное Animal
class Animal {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}

const obj = { canEat: true };
console.log(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)


/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */


/*
    Большая часть классов не имеет метода Symbol.hasInstance.
    В этом случае используется стандартная логика: проверяется, равен ли Class.prototype
    одному из прототипов в прототипной цепочке obj.
 */

// obj.__proto__ === Class.prototype?
// obj.__proto__.__proto__ === Class.prototype?
// obj.__proto__.__proto__.__proto__ === Class.prototype?

// если какой-то из ответов true - возвратить true
// если дошли до конца цепочки - false

class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
console.log(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (нет совпадения)
// rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)


/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */


// Бонус: Object.prototype.toString возвращает тип

// скопируем метод toString в переменную для удобства
const objectToString = Object.prototype.toString;
const arr = [];
console.log( objectToString.call(arr) ); // [object Array]

const s = Object.prototype.toString;

console.log( s.call(123) ); // [object Number]
console.log( s.call(null) ); // [object Null]
console.log( s.call(alert) ); // [object Function]


/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */


// Symbol.toStringTag
const user = {
    [Symbol.toStringTag]: "User"
};
console.log( {}.toString.call(user) ); // [object User]

// toStringTag для браузерного объекта и класса
console.log( window[Symbol.toStringTag]); // window
console.log( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

console.log( {}.toString.call(window) ); // [object Window]
console.log( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]



/* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** */

// Задача

/*
    Странный instanceof
    Почему instanceof в примере ниже возвращает true? Мы же видим, что a не создан с помощью B().
 */

function A() {}
function B() {}

A.prototype = B.prototype = {};

const a = new A();

console.log( a instanceof B ); // true

// instanceof не учитывает саму функцию при проверке,
// а только prototype, который проверяется на совпадения в прототипной цепочке.
// в данном примере a.__proto__ == B.prototype


