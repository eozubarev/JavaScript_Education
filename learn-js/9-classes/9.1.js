// Класс: базовый синтаксис

// В JavaScript класс – это разновидность функции.
class User {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(this.name);
    }
}

// доказательство: User - это функция
console.log(typeof User); // function


class Admin {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(this.name);
    }
}

// класс - это функция
console.log(typeof Admin); // function

// ...или, если точнее, это метод constructor
console.log(Admin === Admin.prototype.constructor); // true

// Методы находятся в Admin.prototype, например:
console.log(Admin.prototype.sayHi); // console.log(this.name);

// в прототипе ровно 2 метода
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi




// Class Expression
const User = class {
    sayHi() {
        alert("Привет");
    }
};




// Геттеры/сеттеры, другие сокращения
class User {

    constructor(name) {
        // вызывает сеттер
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("Имя слишком короткое.");
            return;
        }
        this._name = value;
    }

}

let user = new User("Иван");
console.log(user.name); // Иван

user = new User(""); // Имя слишком короткое.




// Базовый синтаксис
class MyClass {
    prop = value; // свойство
    constructor(...) { // конструктор
        // ...
    }
    method(...) {} // метод
    get something(...) {} // геттер
    set something(...) {} // сеттер
    [Symbol.iterator]() {} // метод с вычисляемым именем (здесь - символом)
    // ...
}






// Задача с Learn JS
/*
    Перепишите класс
    Класс Clock написан в функциональном стиле.
    Перепишите его, используя современный синтаксис классов.
    P.S. Часики тикают в консоли. Откройте её, чтобы посмотреть.
 */
/*
    function Clock({ template }) {

        let timer;

        function render() {
            let date = new Date();

            let hours = date.getHours();
            if (hours < 10) hours = '0' + hours;

            let mins = date.getMinutes();
            if (mins < 10) mins = '0' + mins;

            let secs = date.getSeconds();
            if (secs < 10) secs = '0' + secs;

            let output = template
                .replace('h', hours)
                .replace('m', mins)
                .replace('s', secs);

            console.log(output);
        }

        this.stop = function() {
            clearInterval(timer);
        };

        this.start = function() {
            render();
            timer = setInterval(render, 1000);
        };

    }

    let clock = new Clock({template: 'h:m:s'});
    clock.start();
*/

class Clock {
    constructor({template}) {
        this.timer = '';
        this.template = template;
    }
    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }
    stop() {
        clearInterval(this.timer);
    }
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock = new Clock({template: 'h:m:s'});
clock.start();