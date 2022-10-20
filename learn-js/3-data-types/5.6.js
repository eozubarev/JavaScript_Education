// Перебираемые объекты
// https://learn.javascript.ru/iterable

// Перебираемые (или итерируемые) объекты – это обобщение массивов.
// Концепция, которая позволяет использовать любой объект в цикле for..of.

// Symbol.iterator
// Мы легко поймём принцип устройства перебираемых объектов, создав один из них.
// Например, у нас есть объект. Это не массив, но он выглядит подходящим для for..of.
// Например, объект range, который представляет собой диапазон чисел:

let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    alert(num); // 1, затем 2, 3, 4, 5
}

// Теперь range[Symbol.iterator]() возвращает сам объект range:
// у него есть необходимый метод next(), и он запоминает текущее состояние итерации в this.current.



// Строка – перебираемый объект
// Среди встроенных перебираемых объектов наиболее широко используются массивы и строки.
// Для строки for..of перебирает символы

for (let char of "test") {
    // срабатывает 4 раза: по одному для каждого символа
    alert( char ); // t, затем e, затем s, затем t
}

// И он работает корректно даже с суррогатными парами!

let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, а затем 😂
}


// Явный вызов итератора

let str2 = "Hello";

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str2[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    alert(result.value); // выводит символы один за другим
}



// Итерируемые объекты и псевдомассивы
// Итерируемые объекты – это объекты, которые реализуют метод Symbol.iterator, как было описано выше.
// Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы.

let arrayLike = { // есть индексы и свойство length => псевдомассив
    0: "Hello",
    1: "World",
    length: 2
};

// Ошибка (отсутствует Symbol.iterator)
for (let item of arrayLike) {}



// Array.from
// Есть универсальный метод Array.from, который принимает итерируемый
// объект или псевдомассив и делает из него «настоящий» Array. После этого мы уже можем использовать методы массивов.
let arrayLike2 = {
    0: "Hello",
    1: "World",
    length: 2
};

let arr = Array.from(arrayLike2); // (*)
alert(arr.pop()); // World (метод работает)

// Array.from в строке (*) принимает объект, проверяет, является ли он итерируемым
// объектом или псевдомассивом, затем создаёт новый массив и копирует туда все элементы.

let str3 = '𝒳😂';

// разбивает строку на массив её элементов
let chars = Array.from(str3);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2