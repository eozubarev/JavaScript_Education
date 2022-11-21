// Объект функции, NFE
// https://learn.javascript.ru/function-object

// Свойство «name»
function sayHi() {
    console.log("Hi");
}
console.log(sayHi.name); // sayHi

const sayHi2 = function() {
    console.log("Hi");
};
console.log(sayHi2.name); // sayHi (есть имя!)

// В спецификации это называется «контекстное имя»: если функция не имеет name,
// то JavaScript пытается определить его из контекста.

//Также имена имеют и методы объекта:
const user = {

    sayHi() {
        // ...
    },

    sayBye: function() {
        // ...
    }

}

console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye


// функция объявлена внутри массива
let arr = [function() {}];
console.log( arr[0].name ); // <пустая строка>
// здесь отсутствует возможность определить имя, поэтому его нет




// Свойство «length» - содержит количество параметров функции в её объявлении.
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}  // троеточие, обозначающее «остаточные параметры», здесь как бы «не считается»

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2





// Пользовательские свойства
// можем добавить свои собственные свойства.

function sayHi3() {
    console.log("Hi");

    // давайте посчитаем, сколько вызовов мы сделали
    sayHi3.counter++;
}
sayHi3.counter = 0; // начальное значение

sayHi3(); // Hi
sayHi3(); // Hi

console.log( `Вызвана ${sayHi3.counter} раза` ); // Вызвана 2 раза





// Named Function Expression
// Named Function Expression или NFE – это термин для Function Expression, у которого есть имя.
let sayHi4 = function func(who) {
    console.log(`Hello, ${who}`);
};

sayHi4("John"); // Hello, John

// Есть две важные особенности имени func, ради которого оно даётся:
// Оно позволяет функции ссылаться на себя же.
// Оно не доступно за пределами функции.


let sayHi5 = function func3(who) {
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func3("Guest"); // использует func, чтобы снова вызвать себя же
    }
};

sayHi5(); // Hello, Guest

// А вот так - не cработает:
// func3(); // Ошибка, func не определена (недоступна вне функции)





// Задачи
// Установка и уменьшение значения счётчика
/*  Измените код makeCounter() так, чтобы счётчик мог увеличивать и устанавливать значение:
    counter() должен возвращать следующее значение (как и раньше).
    counter.set(value) должен устанавливать счётчику значение value.
    counter.decrease() должен уменьшать значение счётчика на 1.
 */

function makeCounter() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = value => count = value;

    counter.decrease = () => count--;

    return counter;
}

const counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
counter.set(10); // установить новое значение счётчика
console.log( counter() ); // 10
counter.decrease(); // уменьшить значение счётчика на 1
console.log( counter() ); // 10 (вместо 11)




// Сумма с произвольным количеством скобок
// Напишите функцию sum, которая бы работала следующим образом:
/*
    sum(1)(2) == 3; // 1 + 2
    sum(1)(2)(3) == 6; // 1 + 2 + 3
    sum(5)(-1)(2) == 6
    sum(6)(-1)(-2)(-3) == 0
    sum(0)(1)(2)(3)(4)(5) == 15
 */

function sum(a) {

    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function() {
        return currentSum;
    };

    return f;
}

console.log( sum(1)(2) ); // 3
console.log( sum(5)(-1)(2) ); // 6
console.log( sum(6)(-1)(-2)(-3) ); // 0
console.log( sum(0)(1)(2)(3)(4)(5) ); // 15