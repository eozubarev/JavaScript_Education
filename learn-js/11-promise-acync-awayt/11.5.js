// Promise API


// Promise all
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(console.log)

// Если любой из промисов завершится с ошибкой, то промис,
// возвращённый Promise.all, немедленно завершается с этой ошибкой.

Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(console.log); // Error: Ошибка!





// Promise.allSettled

/*
    Метод Promise.allSettled всегда ждёт завершения всех промисов. В массиве результатов будет
    {status:"fulfilled", value:результат} для успешных завершений,
    {status:"rejected", reason:ошибка} для ошибок.
 */

const promise = Promise.allSettled([
    new Promise((resolve, reject) => {
        reject(new Error("test 1"));
        setTimeout(() => {
            console.log(1)
        }, 3000)
    }),
    new Promise((resolve) => {
        setTimeout(() => {
            console.log(2)
            resolve()
        }, 3000)
    }),
    new Promise((resolve, reject) => {
        reject(new Error("test"));
        setTimeout(() => {
            console.log(3)
        }, 3000)
    }),
])
    .then((value) => console.log(value))
    .then((e) => console.error(e))

/*
    Array(3) [ {…}, {…}, {…} ]

    0: Object { status: "rejected", reason: Error }
    1: Object { status: "fulfilled", value: undefined }
    2: Object { status: "rejected", reason: Error }
*/




// Promise.race
// Метод очень похож на Promise.all, но ждёт только
// первый выполненный промис, из которого берёт результат (или ошибку).

const promise2 = Promise.race([
    new Promise((resolve, reject) => {
        reject(new Error("test 1"));
        setTimeout(() => {
            console.log(1)
        }, 3000)
    }),
    new Promise((resolve) => {
        setTimeout(() => {
            console.log(2)
            resolve()
        }, 3000)
    }),
    new Promise((resolve, reject) => {
        reject(new Error("test"));
        setTimeout(() => {
            console.log(3)
        }, 3000)
    }),
])
    .then((value) => console.log(value))
    .then((e) => console.error(e))

// Uncaught (in promise) Error: test 1




// Promise.any
// Метод очень похож на Promise.race, но ждёт только первый успешно выполненный промис, из которого берёт результат.
const promise2 = Promise.any([
    new Promise((resolve, reject) => {
        reject(new Error("test 1"));
        setTimeout(() => {
            console.log(1)
        }, 3000)
    }),
    new Promise((resolve) => {
        setTimeout(() => {
            console.log(2)
            resolve('123')
        }, 3000)
    }),
    new Promise((resolve, reject) => {
        reject(new Error("test"));
        setTimeout(() => {
            console.log(3)
        }, 3000)
    }),
])
    .then((value) => console.log(value))
    .then((e) => console.error(e))

// 1, 2, 123, 3


