// Промисы: обработка ошибок

/*
    Цепочки промисов отлично подходят для перехвата ошибок.
    Если промис завершается с ошибкой, то управление переходит в ближайший обработчик ошибок.
    На практике это очень удобно.
*/

fetch('https://no-such-server.blabla') // ошибка
    .then(response => response.json())
    .catch(err => alert(err)) // TypeError: failed to fetch (текст может отличаться)


/* *** *** ****** *** ****** *** ****** *** *** */


// Или, может быть, с сервером всё в порядке, но в ответе мы получим некорректный JSON.
// Самый лёгкий путь перехватить все ошибки – это добавить .catch в конец цепочки:

fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    }))
    .catch(error => console.log(error.message));

// Window.fetch: /article/promise-chaining/user.json is not a valid URL.

/*
    Если все в порядке, то такой .catch вообще не выполнится.
    Но если любой из промисов будет отклонён (проблемы с сетью или некорректная json-строка, или что угодно другое),
    то ошибка будет перехвачена.
*/


/* *** *** ****** *** ****** *** ****** *** *** */


// Неявный try…catch

// Вокруг функции промиса и обработчиков находится "невидимый try..catch".
// Если происходит исключение, то оно перехватывается, и промис считается отклонённым с этой ошибкой.

new Promise((resolve, reject) => {
    throw new Error("Ошибка!");
}).catch(alert); // Error: Ошибка!

// …Работает так же, как и этот:

new Promise((resolve, reject) => {
    reject(new Error("Ошибка!"));
}).catch(console.log); // Error: Ошибка!



// "Невидимый try..catch" вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.
// Это работает не только в функции промиса, но и в обработчиках.

new Promise((resolve, reject) => {
    resolve("ок");
}).then((result) => {
    throw new Error("Ошибка!"); // генерируем ошибку
}).catch(console.log); // Error: Ошибка!

// Это происходит для всех ошибок, не только для тех, которые вызваны оператором throw. Например, программная ошибка:

new Promise((resolve, reject) => {
    resolve("ок");
}).then((result) => {
    aboba(); // нет такой функции
}).catch(console.log); // ReferenceError: blabla is not defined




/* *** *** ****** *** ****** *** ****** *** *** */

/*
    Задача Learn JS
    Ошибка в setTimeout
    Что вы думаете? Выполнится ли .catch? Поясните свой ответ.
 */

new Promise(function (resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(console.log);

// Ответ: нет, не выполнится
// здесь есть скрытый try/catch
// В этом коде ошибка создается не по ходу выполнения а позже. Поэтому промис не может обработать её.
// ошибка Uncaught Error: Whoops!

// Как вариант можно сделать так

new Promise(function (resolve, reject) {
    setTimeout(() => {
// throw new Error("Whoops!");
        reject(new Error("Whoops!"));
    }, 1000);
}).catch(alert);