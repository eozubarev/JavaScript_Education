// Флаги и дескрипторы свойств

// Флаги свойств
// Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

/*
    writable – если true, свойство можно изменить, иначе оно только для чтения.
    enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
    configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
 */

// Мы ещё не встречали эти атрибуты, потому что обычно они скрыты. Когда мы создаём свойство
// «обычным способом», все они имеют значение true. Но мы можем изменить их в любое время.

// Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.
const descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

const user = {
    name: "John"
};

const descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/


// Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.
Object.defineProperty(obj, propertyName, descriptor)

// Например, здесь создаётся свойство name, все флаги которого имеют значение false:
const user = {};

Object.defineProperty(user, "name", {
    value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */



// Только для чтения
const user = {
    name: "John"
};

Object.defineProperty(user, "name", {
    writable: false
});

user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'

/*
    Ошибки появляются только в строгом режиме
    В нестрогом режиме, без use strict, мы не увидим никаких ошибок при записи
    в свойства «только для чтения» и т.п. Но эти операции всё равно не будут выполнены успешно.
    Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
 */


// Вот тот же пример, но свойство создано «с нуля»:

const user = { };

Object.defineProperty(user, "name", {
    value: "John",
    // для нового свойства необходимо явно указывать все флаги, для которых значение true
    enumerable: true,
    configurable: true
});

alert(user.name); // John
user.name = "Pete"; // Ошибка



// Неперечислимое свойство
// Теперь добавим собственный метод toString к объекту user.
// Встроенный метод toString в объектах – неперечислимый, его не
// видно в цикле for..in. Но если мы напишем свой собственный
// метод toString, цикл for..in будет выводить его по умолчанию:

const user = {
    name: "John",
    toString() {
        return this.name;
    }
};

// По умолчанию оба свойства выведутся:
for (let key in user) alert(key); // name, toString

// Если мы этого не хотим, можно установить для свойства enumerable:false.
// Тогда оно перестанет появляться в цикле for..in аналогично встроенному toString:

const user = {
    name: "John",
    toString() {
        return this.name;
    }
};

Object.defineProperty(user, "toString", {
    enumerable: false
});

// Теперь наше свойство toString пропало из цикла:
for (let key in user) alert(key); // name




// Неконфигурируемое свойство

// Флаг неконфигурируемого свойства (configurable:false) иногда предустановлен для некоторых встроенных объектов и свойств.
// Неконфигурируемое свойство не может быть удалено.

let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// То есть программист не сможет изменить значение Math.PI или перезаписать его.
Math.PI = 3; // Ошибка
// delete Math.PI тоже не сработает

// В коде ниже мы делаем user.name «навечно запечатанной» константой:

const user = { };

Object.defineProperty(user, "name", {
    value: "John",
    writable: false,
    configurable: false
});

// теперь невозможно изменить user.name или его флаги
// всё это не будет работать:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // Ошибка



// Метод Object.defineProperties
// Существует метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.
Object.defineProperties(user, {
    name: { value: "John", writable: false },
    surname: { value: "Smith", writable: false },
    // ...
});



// Object.getOwnPropertyDescriptors
// Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом Object.getOwnPropertyDescriptors(obj).
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
for (let key in user) {
    clone[key] = user[key]
}