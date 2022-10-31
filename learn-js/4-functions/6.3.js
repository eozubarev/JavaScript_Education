// Замыкания
// https://learn.javascript.ru/closure

// Независимы ли счётчики?
// Здесь мы делаем два счётчика: counter и counter2, используя одну и ту же функцию makeCounter.
// Они независимы? Что покажет второй счётчик? 0,1 или 2,3 или что-то ещё?

function makeCounter() {
    let count = 0;
    return function() {
        return count++;
    };
}

// const counter = makeCounter();
// const counter2 = makeCounter();

// console.log( counter() ); // 0
// console.log( counter() ); // 1

// console.log( counter2() ); // 0
// console.log( counter2() ); // 1

// Счётчики являются независимыми т.к у них независимые внешние
// лексические окружения, у каждого из которых свой собственный count.




// Объект счётчика
// Здесь объект счётчика создан с помощью функции-конструктора.
// Будет ли он работать? Что покажет?

function Counter() {
    let count = 0;

    this.up = function() {
        return ++count;
    };
    this.down = function() {
        return --count;
    };
}

const counter = new Counter();

// console.log( counter.up() ); // 1
// console.log( counter.up() ); // 2
// console.log( counter.down() ); // 1

// обе вложенные функции были созданы с одним и тем же внешним лексическим окружением,
// так что они имеют доступ к одной и той же переменной count:




// Функция в if
// Посмотрите на код. Какой будет результат у вызова на последней строке?
const phrase = "Hello";

if (true) {
    let user = "John";
    function sayHi() {
        console.log(`${phrase}, ${user}`);
    }
}

// sayHi(); // ошибка
// Функция sayHi объявлена внутри if, она живёт только внутри этого блока. Снаружи нет sayHi.





// Сумма с помощью замыканий
// Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.
// Да, именно таким образом, используя двойные круглые скобки (не опечатка).
// Например:
// sum(1)(2) = 3
// sum(5)(-1) = 4

function sum(a) {

    return function(b) {
        return a + b; // берёт "a" из внешнего лексического окружения
    };

}

console.log(sum(1)(2)) // 3




// Фильтрация с помощью функции
// У нас есть встроенный метод arr.filter(f) для массивов.
// Он фильтрует все элементы с помощью функции f.
// Если она возвращает true, то элемент добавится в возвращаемый массив.

// Сделайте набор «готовых к употреблению» фильтров:
// - inBetween(a, b) – между a и b (включительно).
// -inArray([...]) – находится в данном массиве.
// Они должны использоваться таким образом:

// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива

/* .. ваш код для inBetween и inArray */
const arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
    return function(x) {
        return x >= a && x <= b;
    };
}

function inArray(arr) {
    return function(x) {
        return arr.includes(x);
    };
}

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2




// Сортировать по полю

// У нас есть массив объектов, который нужно отсортировать:
const users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

// Можем ли мы сделать его короче, например вот таким?
// users.sort(byField('name'));
// users.sort(byField('age'));
// То есть чтобы вместо функции мы просто писали byField(fieldName).

// Напишите функцию byField, которая может быть использована для этого.

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

users.sort(byField('name'));
users.forEach(user => console.log(user.name)); // Ann, John, Pete

users.sort(byField('age'));
users.forEach(user => console.log(user.name)); // Pete, Ann, John




// Армия функций
// Следующий код создаёт массив из стрелков (shooters).
// Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так…

/*
    function makeArmy() {
      let shooters = [];

      let i = 0;
      while (i < 10) {
        let shooter = function() { // функция shooter
          alert( i ); // должна выводить порядковый номер
        };
        shooters.push(shooter);
        i++;
      }

      return shooters;
    }

    let army = makeArmy();

    army[0](); // у 0-го стрелка будет номер 10
    army[5](); // и у 5-го стрелка тоже будет номер 10
    // ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...
 */

// Почему у всех стрелков одинаковые номера? Почините код, чтобы он работал как задумано.
function makeArmy() {
    const shooters = [];

    for (let i = 0; i < 10; i++) {
        const shooter = function() { // функция shooter
            console.log( i ); // должна выводить порядковый номер
        };
        shooters.push(shooter);
    }

    return shooters;
}

const army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
// ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...

// Решение с while
//  while так же, как и for теперь создаёт новое лексическое окружение для каждой итерации.
function makeArmy() {
    let shooters = [];

    let i = 0;
    while (i < 10) {
        let j = i;
        let shooter = function() { // функция shooter
            alert( j ); // должна выводить порядковый номер
        };
        shooters.push(shooter);
        i++;
    }

    return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5