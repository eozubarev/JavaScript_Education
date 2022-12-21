// Цепочка промисов
// https://learn.javascript.ru/promise-chaining

// результат передаётся по цепочке обработчиков, и мы видим несколько console.log подряд, которые выводят: 1 → 2 → 4.
// Всё это работает, потому что вызов promise.then тоже возвращает промис, так что мы можем вызвать на нём следующий .then.

const myPromise2  =new Promise((resolve, reject) => {

    setTimeout(() => resolve(1), 1000); // (*)

}).then((result) => { // (**)

    console.log(result); // 1
    return result * 2;

}).then((result) => { // (***)

    console.log(result); // 2
    return result * 2;

}).then((result) => {

    console.log(result); // 4
    return result * 2;

});


/* *** *** *** *** *** ***  */


/*
    Классическая ошибка новичков: технически возможно добавить много обработчиков
    .then к единственному промису. Но это не цепочка.
    Они не передают друг другу результаты своего выполнения, а действуют независимо.
 */

const promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});



/* *** *** *** *** *** ***  */



/*
    Возвращаем промисы
    Обработчик handler, переданный в .then(handler), может вернуть промис.
    В этом случае дальнейшие обработчики ожидают, пока он выполнится, и затем получают его результат.
 */

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);

}).then(function(result) {

    console.log(result); // 1

    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
    });

}).then(function(result) { // (**)

    console.log(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });

}).then(function(result) {

    console.log(result); // 4

});

// Таким образом, как и в предыдущем примере, выводятся 1 → 2 → 4,
// но сейчас между вызовами alert существует пауза в 1 секунду.
// Возвращая промисы, мы можем строить цепочки из асинхронных действий.


/* *** *** *** *** *** ***  */

// fetch
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))


// Запрашиваем что-нибудь с github

function loadJson(url) {
    return fetch(url)
        .then(response => response.json());
}

function loadGithubUser(name) {
    return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
}

function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    });
}

// Используем их:
loadJson('/article/promise-chaining/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
// ...


// ещё что-нибудь

fetch('https://api.github.com/users/eozubarev')
    // Загружаем ответ в формате json
    .then(response => response.json())
    .then(githubUser => {
        const userId = githubUser.id;
        const login = githubUser.login;
        const bio = githubUser.bio;
        const link = githubUser.blog;


        console.log(`ID: ${userId}`)
        console.log(`Login: ${login}`)
        console.log(`Bio: ${bio}`)
        console.log(`Link: ${link}`)
    })


/*
    Если обработчик в .then (или в catch/finally, без разницы) возвращает промис,
    последующие элементы цепочки ждут, пока этот промис выполнится. Когда это происходит,
    результат его выполнения (или ошибка) передаётся дальше.
*/



/* *** *** *** *** *** ***  */
// Задача Learn JS

/*
    Промисы: сравните then и catch
    Являются ли фрагменты кода ниже эквивалентными? Другими словами, ведут ли они себя одинаково
    во всех обстоятельствах, для всех переданных им обработчиков?
*/

promise.then(f1).catch(f2);
// Против:
promise.then(f1, f2);

// Нет, ведут себя по разному
// если ошибка будет в f1, то она будет обработана в .catch в этом примере:
promise
    .then(f1)
    .catch(f2);

// но не в этом
promise
    .then(f1, f2);

// Ошибка передаётся по цепочке, но во втором примере нет продолжения цепочки после f1.