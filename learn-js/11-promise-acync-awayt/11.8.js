// Async/await

async function f() {
    return 1;
}

// У слова async один простой смысл: эта функция всегда возвращает промис.
// Значения других типов оборачиваются в завершившийся успешно промис автоматически.

async function f2() {
    return 1;
}

f2().then(console.log); // 1

// одно и тоже

async function f3() {
    return Promise.resolve(1);
}

f3().then(console.log); // 1




// Await

/*
    Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится.
    После чего оно вернёт его результат, и выполнение кода продолжится.
 */

async function f4() {

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });

    const result = await promise; // будет ждать, пока промис не выполнится (*)

    console.log(result); // "готово!"
}

f4();


// Асинхронные методы классов
class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}

new Waiter()
    .wait()
    .then(console.log); // 1



// Обработка ошибок

//Такой код:
async function f8() {
    await Promise.reject(new Error("Упс!"));
}

// Делает то же самое, что и такой:
async function f9() {
    throw new Error("Упс!");
}

/*
    Но есть отличие: на практике промис может завершиться с ошибкой не сразу, а через некоторое время.
    В этом случае будет задержка, а затем await выбросит исключение.
    Такие ошибки можно ловить, используя try..catch, как с обычным throw:
 */

async function f10() {
    try {
        let response = await fetch('http://no-such-url');
    } catch(err) {
        console.log(err); // TypeError: failed to fetch
    }
}

f10();




// Задачи

/*
    Перепишите один из примеров раздела Цепочка промисов,
    используя async/await вместо .then/catch:

    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
    }

    loadJson('no-such-user.json') // (3)
      .catch(alert); // Error: 404

*/

async function loadJson(url) {
    const response = await fetch(url);

    if (response.status === 200) {
        const json = await response.json();
        return json;
    }

    throw new Error(response.status);
}

loadJson('no-such-user.json')
    .catch(console.log); // Error: 404 (4)




/*
    Перепишите, используя async/await
    Ниже пример из раздела Цепочка промисов, перепишите его, используя async/await вместо .then/catch.
    В функции demoGithubUser замените рекурсию на цикл: используя async/await, сделать это будет просто.
 */

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {

    let user;

    while(true) {
        const name = prompt("Введите логин?", "iliakan");

        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch(err) {
            if (err instanceof HttpError && err.response.status == 404) {
                console.log("Такого пользователя не существует, пожалуйста, повторите ввод.");
            } else {
                throw err;
            }
        }
    }


    console.log(`Полное имя: ${user.name}.`);
    return user;
}

demoGithubUser();



/*
    Вызовите async–функцию из "обычной"
    Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?

    async function wait() {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return 10;
    }

    function f() {
      // ...что здесь написать?
      // чтобы вызвать wait() и дождаться результата "10" от async–функции
      // не забывайте, здесь нельзя использовать "await"
    }

*/

async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
}

function f11() {
    wait().then(result => console.log(result));
}

f11(); // 10




/*
    Получить и вывести пост с помощью async await
    с JSON Placeholder https://jsonplaceholder.typicode.com/posts/ id поста
    При вызове посты должны выводится по порядку 1, 2, 3 ... n.
*/

async function getPosts (postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (response.status === 200) {
            return response.url
        }
    } catch(err) {
        console.log(err);
    }
}

// получаем несколько постов по порядку 1,2,3 ... n
async function getSomePosts () {

    const post1 = await getPosts(1)
    console.log(post1)

    const post2 = await getPosts(2)
    console.log(post2)

    const post3 = await getPosts(3)
    console.log(post3)
}

getSomePosts() // 1, 2, 3




