// Привязка контекста к функции


// Потеря «this»
// Мы уже видели примеры потери this. Как только метод передаётся отдельно от объекта – this теряется.
// Вот как это может произойти в случае с setTimeout:

const user = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000); // Привет, undefined!

// При запуске этого кода мы видим, что вызов this.firstName возвращает не «Вася», а undefined!
// Это произошло потому, что setTimeout получил функцию sayHi отдельно от объекта user
// (именно здесь функция и потеряла контекст). То есть последняя строка может быть переписана как:



// Решение 1: сделать функцию-обёртку

const user = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);
    }
};

setTimeout(function() {
    user.sayHi(); // Привет, Вася!
}, 1000);

// То же самое, только короче:
setTimeout(() => user.sayHi(), 1000); // Привет, Вася!

/*
    Выглядит хорошо, но теперь в нашем коде появилась небольшая уязвимость.
    Что произойдёт, если до момента срабатывания setTimeout (ведь задержка составляет целую секунду!)
    в переменную user будет записано другое значение? Тогда вызов неожиданно будет совсем не тот!
*/

const user = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);
    }
};

setTimeout(() => user.sayHi(), 1000);

// ...в течение 1 секунды
user = { sayHi() { alert("Другой пользователь в 'setTimeout'!"); } };

// Другой пользователь в 'setTimeout'!





// Решение 2: привязать контекст с помощью bind
// Вызов boundFunc подобен вызову func с фиксированным this.
// Например, здесь funcUser передаёт вызов в func, фиксируя this=user:

const user = {
    firstName: "Вася"
};

function func() {
    alert(this.firstName);
}

const funcUser = func.bind(user);
funcUser(); // Вася


// Все аргументы передаются исходному методу func как есть, например:
const user = {
    firstName: "Вася"
};

function func(phrase) {
    alert(phrase + ', ' + this.firstName);
}

// привязка this к user
const funcUser = func.bind(user);

funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this =