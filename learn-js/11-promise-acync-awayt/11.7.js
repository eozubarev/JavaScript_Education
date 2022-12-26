// Микрозадачи
// https://learn.javascript.ru/microtask-queue

// Обработчики промисов .then/.catch/.finally всегда асинхронны.

const promise = Promise.resolve();
promise.then(() => console.log("промис выполнен"));

console.log("код выполнен"); // этот log показывается первым


// В каком порядке выполнится код

console.log(1)

setTimeout(() => {
    console.log(2)
})

const promise1 = new Promise((resolve, reject) => {
    console.log(3)
    resolve(4)
})

const promise2 = new Promise((resolve, reject) => {
    console.log(5)
    resolve(6)
})

promise1.then(console.log)
promise2.then(console.log)

console.log(7)

// 1
// 3
// 5
// 7
// 4
// 6
// 2
