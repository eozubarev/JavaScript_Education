// Что такое колбек?
// Это функция переданная в качестве параметра внутри другой функции

const first = (callback) => {
    // Как будто бы запрос к API
    setTimeout(() => {
        console.log(1);
        callback();
    }, 500 );
};

const second = () => {
    console.log(2);
};

first(second);
// 1
// 2



// Что такое промисы? Чем они отличаются от колбеков?
/*
    Промисы представляют API для работы с асинхронным кодом.
    В отличии от callback-ов могут чейнится,
    тем самым позволяя нам выстраивать линейный, который легче поддерживать
    и читать
*/

// callback hell
firstFunction(args, function() {
    secondFunction(args, function() {
        thirdFunction(args, function() {
            thirdFunction(args, function() {
                thirdFunction(args, function() {
                    thirdFunction(args, function() {
                        thirdFunction(args, function() {
                            // And so on…
                        });
                    });
                });
            });
        });
    });
});



// Являются ли аргументы then колбеками?
// да, аргументы then являются колбек функциями

const p1 = new Promise(function(resolve, reject) {
    resolve("Успех!");
    // или
    // reject("Ошибка!");
});

p1.then(function(value) {
    console.log(value); // Успех!
}, function(reason) {
    console.log(reason); // Ошибка!
});




// Метод then() возвращает новый промис?
// Да, по этому мы можем строить цепочку. catch() тоже возвращает промис
new Promise((resolve) => {
    resolve()
}).then((any) => any).then((any2) => any2).then((any3) => any3)




// Что будет, если на завершенный промис добавить .then()
// then выполнится

const anyPromise = new Promise((resolve, reject) => {
    resolve();
}).then(() => {
    console.log('then')
})

anyPromise.then(() => {
    console.log('any promise')
})




// Что такое микро и макро задачи? Примеры
/*
    В JS есть различные очереди. Они имеют разный приоритет исполнения.
    Одни из часто встречаемых это очереди микро и макро задач.

    Микрозадачи имееют более высокий приоритет в отличии от Макро

    К макро можно отнести setTimeout, setInterval, onClick, onmouse и тд.
    К микро например обработчики then (не то, что возвращаем в resolve/reject)

*/

// В данной задачи выведутся консоли
// 1 3 5 7 4 6 2

console.log(1)

setTimeout(() => {
    console.log(2)
})

const promise1 = new Promise(resolve => {
    console.log(3)
    resolve(4)
})

const promise2 = new Promise(resolve => {
    console.log(5)
    resolve(6)
})

promise1.then(console.log)
promise2.then(console.log)

console.log(7)






// Что мы можем промисифицировать? Есть ли ограничения?





// Выполнится ли then после catch, если промис над catch:
// 1. реджетится 2. ресолвится?




// Выполнится ли then перед catch, если промис над then:
// 1. реджетится 2. ресолвится?