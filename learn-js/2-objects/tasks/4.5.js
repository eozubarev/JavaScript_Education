// Конструктор, оператор "new"
// https://learn.javascript.ru/constructor-new

// 1. Две функции - один объект
// Возможно ли создать функции A и B, чтобы new A() == new B()?
function A() {  }
function B() {  }

let a = new A;
let b = new B;

// console.log( a === b ); // true
// Если да – приведите пример вашего кода.

// РЕШЕНИЕ
// Если функция возвращает объект, то new вернёт его вместо this.
const jenya = { name: 'Jenya' }

function C () {
    return jenya
}

function D () {
    return jenya
}

let c = new C;
let d = new D;

console.log( c === d ); // true




// 2. Создайте калькулятор при помощи конструктора, new Calculator
// Создайте функцию-конструктор Calculator, которая создаёт объекты с тремя методами:
// read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
// sum() возвращает сумму этих свойств.
// mul() возвращает произведение этих свойств.

function Calculator() {

    this.read = function() {
        this.numOne = +prompt('First num', 0);
        this.numTwo = +prompt('Second num', 0);
    };

    this.sum = function() {
        return this.numOne + this.numTwo;
    };

    this.mul = function() {
        return this.numOne * this.numTwo;
    };
}

let calculator = new Calculator();
calculator.read();
alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );





// 3. Создайте new Accumulator
// Создайте функцию-конструктор Accumulator(startingValue).
// Объект, который она создаёт, должен уметь следующее:
// Хранить «текущее значение» в свойстве value. Начальное значение устанавливается в аргументе конструктора startingValue.
// Метод read() должен использовать prompt для считывания нового числа и прибавления его к value.

function Accumulator(startingValue) {
    this.startingValue = startingValue;
    this.value = 0;
    this.read = function () {
        this.value = +prompt('Введите число', 0);
        this.value += this.startingValue;
    }
    this.value = function () {
        alert(`Sum= ${this.value}`)
    }
}

let accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
alert(accumulator.value); // выведет сумму этих значений



// Сам потыкался немног


function Dog (name) {
    this.name = name;
    this.sayHello = function() {
        console.log(`Hello my name is ${this.name}`)
    }
}

const jack = new Dog('laika');
const michael = new Dog('bobik')
