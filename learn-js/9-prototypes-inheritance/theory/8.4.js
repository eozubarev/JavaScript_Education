// Методы прототипов, объекты без свойства __proto__

/*
    В первой главе этого раздела мы упоминали, что существуют современные методы работы с прототипами.
    Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.
    Современные же методы это:
 */

// Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors.
// Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
// Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.

//Эти методы нужно использовать вместо __proto__.

const animal = {
    eats: true
};

// создаём новый объект с прототипом animal
const rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit

Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}




// У Object.create есть необязательный второй аргумент: дескрипторы свойств.
// Мы можем добавить дополнительное свойство новому объекту таким образом:

const animal = {
    eats: true
};

const rabbit = Object.create(animal, {
    jumps: {
        value: true
    }
});

console.log(rabbit.jumps); // true




// Мы также можем использовать Object.create для «продвинутого» клонирования объекта,
// более мощного, чем копирование свойств в цикле for..in:

// клон obj c тем же прототипом (с поверхностным копированием свойств)
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));