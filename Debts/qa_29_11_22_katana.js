// 1. Как добавить новое св-во в объект

const obj = {
    name: 'kot',
    age: 25
}

Object.defineProperty(obj, 'lastName', {
    value: 'крутой',
    writable: false // не можем менять св-во
})

obj.lastName = 'привет'
// console.log(obj.lastName) // 'крутой'



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */



// 2. Что такое дескриптор
/*
    Дескриптор – объект, который описывает поведение свойства.

    В нём могут быть следующие поля:

    value – значение свойства, по умолчанию undefined
    writable – значение свойства можно менять, если true. По умолчанию false.
    configurable – если true, то свойство можно удалять, а также менять его в дальнейшем при помощи новых вызовов defineProperty. По умолчанию false.
    enumerable – если true, то свойство просматривается в цикле for..in и методе Object.keys(). По умолчанию false.
    get – функция, которая возвращает значение свойства. По умолчанию undefined.
    set – функция, которая записывает значение свойства. По умолчанию undefined.
 */

// пример дескриптора
let person = {
    _birthYear: 1997
};

Object.defineProperty(person, 'birthYear', { // этот объект является дескриптором
    enumerable: true,
    configurable: false,
    set: function (value) {
        this._birthYear = value;
    },
    get: function() {
        return 'Birth year - ' + this._birthYear;
    }
});

console.log(person.birthYear);



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */


// 3. Отличия класса от функций

class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
}


// Перепишем класс User на чистых функциях
// a. Создаём функцию constructor
function User(name) {
    this.name = name;
}
/*
    каждый прототип функции имеет свойство constructor по умолчанию,
    поэтому нам нет необходимости его создавать
*/

// b. Добавляем метод в прототип
User.prototype.sayHi = function() {
    console.log(this.name);
};

// Использование:
let user = new User("Иван");
user.sayHi();


/*
    c. Функция, созданная с помощью class, помечена специальным внутренним свойством [[IsClassConstructor]]: true.
    Поэтому это не совсем то же самое, что создавать её вручную.
    В отличие от обычных функций, конструктор класса не может быть вызван без new:
*/

/*
    d. Методы класса являются неперечислимыми.
    Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".
    И это хорошо, так как если мы проходимся циклом for..in по объекту,
    то обычно мы не хотим при этом получать методы класса.
*/

class Car {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    getColor() {

    }
    getName() {

    }
}

for (const carKey of Car) {
    console.log(carKey) // Uncaught TypeError: Car is not iterable
}

/*
    e. Классы всегда используют use strict.
    Весь код внутри класса автоматически находится в строгом режиме.
 */

/*
    f. В наследующем классе соответствующая функция-конструктор помечена
    специальным внутренним свойством [[ConstructorKind]]:"derived".

    Разница в следующем:
    Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this .
    Когда запускается конструктор унаследованного класса, он этого не делает. 
    Вместо этого он ждёт, что это сделает конструктор родительского класса.
*/

class Table {
    constructor(name, size) {
        this.name = name;
        this.size = size
    }
}

class Ikea extends Table {
    constructor(name, size , color) {
        super(name, size);
        this.color = color
    }
}

const skvordbruk = new Ikea("Сквордбрук", 'small', 'красный');
console.log(skvordbruk.name); // Сквордбрук
console.log(skvordbruk.color); // красный
console.log(skvordbruk.size); // small



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */



// 4. Где хранятся методы в классе
// В прототипе класса, аналогично этому коду под капотом записываются методы внутрь класса
class Store {
    constructor(model) {
        this.model = model
    }
    // getName() {
    //     console.log(this.model)
    // }
}

Store.prototype.getName = function () { // Тоже самое что и в классу getName()
    console.log(this.model)
}

const moscowStore = new Store('ReStore Москва')
moscowStore.getName()



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */


// 5. Где хранятся методы которые реализованы в стрелочной функции
/*
    Стрелка не имеет своего контекста и присвается к переменной в инстансе (объекте)
    если бы это был declaration, то в прототипе, если статик то в классе)
 */

