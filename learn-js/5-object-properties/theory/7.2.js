// Свойства - геттеры и сеттеры

//Есть два типа свойств объекта.

/*
    Первый тип это свойства-данные (data properties). Мы уже знаем,
    как работать с ними. Все свойства, которые мы использовали до текущего момента, были свойствами-данными.

    Второй тип свойств мы ещё не рассматривали. Это свойства-аксессоры (accessor properties).
    По своей сути это функции, которые используются для присвоения и получения значения,
    но во внешнем коде они выглядят как обычные свойства объекта.
 */

// Геттеры и сеттеры
// Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи.
// При литеральном объявлении объекта они обозначаются get и set:

let obj = {
    get propName() {
        // геттер, срабатывает при чтении obj.propName
    },

    set propName(value) {
        // сеттер, срабатывает при записи obj.propName = value
    }
};

let user = {
    name: "John",
    surname: "Smith"
};

let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

alert(user.fullName); // John Smith

// На данный момент у fullName есть только геттер. Если мы попытаемся назначить user.fullName=, произойдёт ошибка:

    let user = {
        get fullName() {
            return `...`;
        }
    };

user.fullName = "Тест"; // Ошибка (у свойства есть только геттер)

// Давайте исправим это, добавив сеттер для user.fullName:

let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

// set fullName запустится с данным значением
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper



// Дескрипторы свойств доступа

// То есть, дескриптор аксессора может иметь:
// get – функция без аргументов, которая сработает при чтении свойства,
// set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
// enumerable – то же самое, что и для свойств-данных,
// configurable – то же самое, что и для свойств-данных.

let user = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname

// При попытке указать и get, и value в одном дескрипторе будет ошибка:

// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
    get() {
        return 1},
        value: 2
});

// Умные геттеры/сеттеры
/*
    Геттеры/сеттеры можно использовать как обёртки над «реальными»
    значениями свойств, чтобы получить больше контроля над операциями с ними.

    Например, если мы хотим запретить устанавливать короткое имя для user, мы можем
    использовать сеттер name для проверки, а само значение хранить в отдельном свойстве _name:
 */

let user = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            alert("Имя слишком короткое, должно быть более 4 символов");
            return;
        }
        this._name = value;
    }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Имя слишком короткое...



// Использование для совместимости

// У аксессоров есть интересная область применения – они позволяют в любой момент взять
// «обычное» свойство и изменить его поведение, поменяв на геттер и сеттер.
// Например, представим, что мы начали реализовывать объект user, используя свойства-данные имя name и возраст age:

function User(name, age) {
    this.name = name;
    this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25

// Но рано или поздно всё может измениться. Взамен возраста age мы можем
// решить хранить дату рождения birthday, потому что так более точно и удобно:
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));

// Добавление геттера для age решит проблему:

    function User(name, birthday) {
        this.name = name;
        this.birthday = birthday;

        // возраст рассчитывается из текущей даты и дня рождения
        Object.defineProperty(this, "age", {
            get() {
                let todayYear = new Date().getFullYear();
                return todayYear - this.birthday.getFullYear();
            }
        });
    }

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // доступен как день рождения
alert( john.age );      // ...так и возраст