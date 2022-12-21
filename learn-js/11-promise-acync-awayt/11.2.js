// Промисы
// https://learn.javascript.ru/promise-basics


/*
    У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:

    state («состояние») — вначале "pending" («ожидание»), потом меняется на "fulfilled" («выполнено успешно»)
    при вызове resolve или на "rejected" («выполнено с ошибкой») при вызове reject.
    result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или на error
    при вызове reject(error).
 */

const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000)
})

promise.then(() => console.log('hello')) // hello


const promise2 = new Promise(function(resolve, reject) {
    // спустя одну секунду будет сообщено, что задача выполнена с ошибкой
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});





/*
    Может быть что-то одно: либо результат, либо ошибка
    Исполнитель должен вызвать что-то одно: resolve или reject.
    Состояние промиса может быть изменено только один раз.
    Все последующие вызовы resolve и reject будут проигнорированы:
 */

// Все последующие вызовы resolve и reject будут проигнорированы:
const promise3 = new Promise(function(resolve, reject) {
    resolve(console.log('done')); // done

    reject(new Error("…")); // игнорируется
    setTimeout(() => resolve("…")); // игнорируется
});





// Потребители: then, catch

// then
promise.then(
    function(result) { /* обработает успешное выполнение */ },
    function(error) { /* обработает ошибку */ }
);

const promise4 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});

// resolve запустит первую функцию, переданную в .then
promise4.then(
    result => alert(result), // выведет "done!" через одну секунду
    error => alert(error) // не будет запущена
);

// А в случае ошибки в промисе – выполнится вторая:

const promise = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject запустит вторую функцию, переданную в .then
promise.then(
    result => console.log(result), // не будет запущена
    error => console.log(error) // выведет "Error: Whoops!" спустя одну секунду
);






// catch
const promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Ошибка!")), 1000);
});

promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду
// Вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f).

promise.then(null, () => {
    console.log('ошибочка')
})





// finally
/*
    Вызов .finally(f) похож на .then(f, f), в том смысле, что f выполнится в любом случае,
    когда промис завершится: успешно или с ошибкой.

    Идея finally состоит в том, чтобы настроить обработчик для выполнения очистки/доведения
    после завершения предыдущих операций.
 */

new Promise((resolve, reject) => {
    /* сделать что-то, что займёт время, и после вызвать resolve или может reject */
})
    // выполнится, когда промис завершится, независимо от того, успешно или нет
    .finally(() => остановить индикатор загрузки)
// таким образом, индикатор загрузки всегда останавливается, прежде чем мы продолжим
.then(result => показать результат, err => показать ошибку)




const mutimKrutim = new Promise((resolve, reject) => {
    let timerId = setTimeout(() => {
        console.log('что-то мутим крутим')
    }, 1000)
})

mutimKrutim.finally(() => {
    clearTimeout(timerId)
    console.log('очистили timeOut или удалили какой-нибудь слушатель')
})


/*
    1. Обработчик, вызываемый из finally, не имеет аргументов.
    В finally мы не знаем, как был завершён промис. И это нормально,
    потому что обычно наша задача – выполнить «общие» завершающие процедуры.
 */

/*
    2. Обработчик finally «пропускает» результат или ошибку дальше, к последующим обработчикам.
    Например, здесь результат проходит через finally к then:
 */

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => console.log("Промис завершён")) // срабатывает первым
    .then(result => console.log(result)); // <-- .then показывает "value"

// А здесь ошибка из промиса проходит через finally к catch:

new Promise((resolve, reject) => {
    throw new Error("error");
})
    .finally(() => alert("Промис завершён")) // срабатывает первым
    .catch(err => alert(err));  // <-- .catch показывает ошибку

/*
    3. Обработчик finally также не должен ничего возвращать.
    Если это так, то возвращаемое значение молча игнорируется.
 */


// На завершённых промисах обработчики запускаются сразу
// Если промис в состоянии ожидания, обработчики в .then/catch/finally будут ждать его.
// при создании промиса он сразу переводится в состояние "успешно завершён"
new Promise(resolve => resolve("готово!"));
promise.then(console.log); // готово! (выведется сразу)



/* ****  ****  ****  ****  ****  ****  ****  ****  ****  ****  ****  ****  **** */


// Задачи

/*  1.
    Можно ли "перевыполнить" промис?
    Что выведет код ниже?
*/


const promise = new Promise(function(resolve, reject) {
    resolve(1);

    setTimeout(() => resolve(2), 1000);
});

promise.then(console.log); // нельзя, выведется 1




/* 2.
    Задержка на промисах

    Встроенная функция setTimeout использует колбэк-функции.
    Создайте альтернативу, использующую промисы.

    Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен»
    через ms миллисекунд, так чтобы мы могли добавить к нему .then:
 */

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'))



/*  3.
    Задачка из телеге от Виктора
    Что выведется, в каком порядке и почему
*/

var a = 5;
setTimeout(() => {
    console.log(a);
    a = 10;
})

var p = new Promise((resolve, reject) => {
    console.log(a);
    a = 25;
    resolve();
})

p.then(() => {
    // some code
})

console.log(a);

// Ответ: 5, 25, 25

/*  Почему:
    1. var a; - sync.
    2. var a = 5; - sync.
    3. setTimeout a = 10 / async. кладём в макротаску (в очередь)
    4. promise(тело) a = 25 / sync.
    5. console.log(a) / sync.

    a. Присваеваем var a = 5;
    Выводим в теле промиса (console.log(a))

    b. Далее присваем в теле промиса var a = 25;
    Выводим в последнем логе (console.log(a))

    c. Event loop доходит до макротасков, достаёт оттуда setTimeout в нём на первом месте лежит console.log(a)
    на данном этапе в памяти хранится var a = 25, поэтому выводит 25. И в конце присвает var a = 10,
    но мы нигде её не увидим т.к это просто присваивание.
*/