// 1. Куда записывается стрелочная функция в классе

class Car {
    constructor(model, color) {
        this.model = model;
        this.color = color;
    }
    arrow = () => {

    }
}

// Проверки на то, куда записывается метод
// const myCar = new Car()
// 1
console.log(myCar.arrow) // [Function: arrow]
// 2
console.log(Car.prototype.arrow) // undefined
// 3
console.log(Car.arrow) // undefined

/*
    Исходя из этих log-ов можно сделать вывод что стрелка записывается
    В 1-м случае у нас есть инстанс и св-во записывается в инстанс класса
    Во 2-м случае у класса в prototype нет св-ва arrow
    В 3-м у самого класса тоже нет св-ва arrow

    Следовательно стрелка записывается в инстанс класса
 */

// Пример со static

class Animal {
    constructor() {
    }
    static eating = () => {

    }
}

const lion = new Animal()
console.log(lion.eating) // undefined
console.log(Animal.prototype.eating) // undefined
console.log(Animal.eating) // [Function: eating]

// следовательно static eating записывается в класс


// Ещё примеры

class Test {
    static test = 123;
    static arrow = () => { return this.test }
    arrow = () => { return this.test }
}

console.log(new Test().arrow) // () => { return this.test } | вернёт просто объект, не вызываем
console.log(Test.prototype.arrow) // undefined | т.к arrow не идёт в прототип, только в инстансе
console.log(Test.test, Test.arrow) // 123 | () => { return this.test } | здесь arrow это 53 строка со static
console.log(new Test().arrow()) // undefined | есть только в статике, вернёт undefined
console.log(Test.arrow()) // 123 | вызовается функция в статике , которая успеша обратится в this и this для неё будет уже статическая обл. видимости