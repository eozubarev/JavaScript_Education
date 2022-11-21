// Планирование: setTimeout и setInterval

// setTimeout позволяет вызвать функцию один раз через определённый интервал времени.
// Синтаксис:
const timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);

// Если первый аргумент является строкой, то JavaScript создаст из неё функцию.
setTimeout("alert('Привет')", 1000);

// Но использование строк не рекомендуется. Вместо этого используйте функции. Например, так:
setTimeout(() => alert('Привет'), 1000);



// Отмена через clearTimeout
// Вызов setTimeout возвращает «идентификатор таймера» timerId, который можно использовать для отмены дальнейшего выполнения.
const timerId = setTimeout(...);
clearTimeout(timerId);

const timerId = setTimeout(() => alert("ничего не происходит"), 1000);
alert(timerId); // идентификатор таймера

clearTimeout(timerId);
alert(timerId); // тот же идентификатор (не принимает значение null после отмены)





// setInterval
// setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени.
// Метод setInterval имеет такой же синтаксис как setTimeout:

let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);

/*
    Все аргументы имеют такое же значение. Но отличие этого метода от setTimeout в том, 
    что функция запускается не один раз, а периодически через указанный интервал времени.
    Чтобы остановить дальнейшее выполнение функции, необходимо вызвать clearInterval(timerId).
*/

// повторить с интервалом 2 секунды
let timerId = setInterval(() => alert('tick'), 2000);

// остановить вывод через 5 секунд
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);



// Cервис, который отправляет запрос для получения данных на сервер каждые 5 секунд, 
// но если сервер перегружен, то необходимо увеличить интервал запросов до 10, 20, 40 секунд… 
// Вот псевдокод:

/*
    let delay = 5000;

    let timerId = setTimeout(function request() {
    ...отправить запрос...

    if (ошибка запроса из-за перегрузки сервера) {
        // увеличить интервал для следующего запроса
        delay *= 2;
    }

    timerId = setTimeout(request, delay);

    }, delay);
*/



// Вложенный setTimeout позволяет задать задержку между выполнениями более точно, чем setInterval.
// Сравним два фрагмента кода. Первый использует setInterval:

let i = 1;
setInterval(function() {
  func(i);
}, 100);


// Второй использует вложенный setTimeout:

let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);


// setTimeout с нулевой задержкой