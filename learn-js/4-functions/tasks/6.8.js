// Декораторы и переадресация вызова, call/apply
// Задачи

/*
    Декоратор-шпион

    Создайте декоратор spy(func), который должен возвращать обёртку,
    которая сохраняет все вызовы функции в своём свойстве calls.

    Каждый вызов должен сохраняться как массив аргументов.

    Например:
    function work(a, b) {
      alert( a + b ); // произвольная функция или метод
    }

    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
      alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }

    P.S.: Этот декоратор иногда полезен для юнит-тестирования.
    Его расширенная форма – sinon.spy – содержится в библиотеке Sinon.JS.
*/

function spy(func) {
    function wrapper(...arg) {
        wrapper.call.push(args)
        return func.apply(this, args)
    }

    wrapper.call = [];
    return wrapper
}





/*
    Задерживающий декоратор

    Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд. Например:

    function f(x) {
      alert(x);
    }

    // создаём обёртки
    let f1000 = delay(f, 1000);
    let f1500 = delay(f, 1500);

    f1000("test"); // показывает "test" после 1000 мс
    f1500("test"); // показывает "test" после 1500 мс
 */

function delay(f, ms) {

    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    };

}

let f1000 = delay(console.log, 1000);
f1000("test"); // показывает "test" после 1000 мс






/*
    Декоратор debounce

    Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт
    вызов f не более одного раза в ms миллисекунд. Другими словами, когда мы вызываем
    debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

    Например:

    let f = debounce(alert, 1000);

    f(1); // выполняется немедленно
    f(2); // проигнорирован

    setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
    setTimeout( () => f(4), 1100); // выполняется
    setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
 */

function debounce(f, ms) {

    let isCooldown = false;

    return function() {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };

}