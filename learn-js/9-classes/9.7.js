// Примеси

/*
    Простейший способ реализовать примесь в JavaScript – это создать объект с полезными методами,
    которые затем могут быть легко добавлены в прототип любого класса.
 */

// примесь
const sayHiMixin = {
    sayHi() {
        console.log(`Привет, ${this.name}`);
    },
    sayBye() {
        console.log(`Пока, ${this.name}`);
    }
};

// использование:
class User {
    constructor(name) {
        this.name = name;
    }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// теперь User может сказать Привет
new User("Вася").sayHi(); // Привет, Вася!

// Это не наследование, а просто копирование методов.



// Примеси могут наследовать друг друга.
// В примере ниже sayHiMixin наследует от sayMixin:
const sayMixin = {
    say(phrase) {
        alert(phrase);
    }
};

const sayHiMixin = {
    __proto__: sayMixin, // (или мы можем использовать Object.create для задания прототипа)

    sayHi() {
        // вызываем метод родителя
        super.say(`Привет, ${this.name}`); // (*)
    },
    sayBye() {
        super.say(`Пока, ${this.name}`); // (*)
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// теперь User может сказать Привет
new User("Вася").sayHi(); // Привет, Вася!