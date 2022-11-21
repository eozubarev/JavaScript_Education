// Декораторы и переадресация вызова, call/apply

// Прозрачное кеширование

/*
    Представим, что у нас есть функция slow(x), выполняющая ресурсоёмкие вычисления,
    но возвращающая стабильные результаты. Другими словами, для одного и
    того же x она всегда возвращает один и тот же результат.

    Если функция вызывается часто, то, вероятно, мы захотим кешировать (запоминать)
    возвращаемые ею результаты, чтобы сэкономить время на повторных вычислениях.
 */

// Вот код с объяснениями:

function slow(x) {
    // здесь могут быть ресурсоёмкие вычисления
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) {    // если кеш содержит такой x,
            return cache.get(x); // читаем из него результат
        }

        let result = func(x); // иначе, вызываем функцию

        cache.set(x, result); // и кешируем (запоминаем) результат
        return result;
    };
}

slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) кешируем
console.log( "Again: " + slow(1) ); // возвращаем из кеша

console.log( slow(2) ); // slow(2) кешируем
console.log( "Again: " + slow(2) ); // возвращаем из кеша




// Применение «func.call» для передачи контекста.
// Упомянутый выше кеширующий декоратор не подходит для работы с методами объектов.
// Например, в приведённом ниже коде worker.slow() перестаёт работать после применения декоратора:

// сделаем worker.slow кеширующим
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // здесь может быть страшно тяжёлая задача для процессора
        console.log("Called with " + x);
        return x * this.someMethod(); // (*)
    }
};

// тот же код, что и выше
function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x); // (**)
        cache.set(x, result);
        return result;
    };
}

console.log( worker.slow(1) ); // оригинальный метод работает
worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим
console.log( worker.slow(2) ); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'

/*
    Ошибка возникает в строке (*). Функция пытается
    получить доступ к this.someMethod и завершается с ошибкой. Видите почему?

    Причина в том, что в строке (**) декоратор вызывает оригинальную
    функцию как func(x), и она в данном случае получает this = undefined.

    Т.е. декоратор передаёт вызов оригинальному методу, но без контекста. Следовательно – ошибка.
 */

// call
function sayHi() {
    console.log(this.name);
}

const user = { name: "John" };
const admin = { name: "Admin" };

// используем 'call' для передачи различных объектов в качестве 'this'
sayHi.call( user ); // John
sayHi.call( admin ); // Admin


// В нашем случае мы можем использовать call в обёртке для передачи контекста в исходную функцию:

const worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        const result = func.call(this, x); // теперь 'this' передаётся правильно
        cache.set(x, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей
console.log( worker.slow(2) ); // работает
console.log( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)

/*  Теперь всё в порядке.
    Чтобы всё было понятно, давайте посмотрим глубже, как передаётся this:

    После декорации worker.slow становится обёрткой function (x) { ... }.
    Так что при выполнении worker.slow(2) обёртка получает 2 в качестве аргумента и this=worker (так как это объект перед точкой).
    Внутри обёртки, если результат ещё не кеширован, func.call(this, x) передаёт текущий this (=worker) и текущий аргумент (=2) в оригинальную функцию.
 */





// Переходим к нескольким аргументам с «func.apply»
// Теперь давайте сделаем cachingDecorator ещё более универсальным.
// До сих пор он работал только с функциями с одним аргументом.
const worker = {
    slow(min, max) {
        console.log(`Called with ${min},${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
        let key = hash(arguments); // (*)
        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func.call(this, ...arguments); // (**)

        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);
console.log( worker.slow(3, 5) ); // работает
console.log( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)