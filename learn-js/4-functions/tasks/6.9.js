// Привязка контекста к функции
// Задачи

/*  1.
    Связанная функция как метод
    Что выведет функция?
 */

function f() {
    console.log( this ); // ?
}

const user = {
    g: f.bind(null)
};

// user.g();

// Ответ: Функция выведет объект null т.к в методе объекта на 14-й строке с помощью bind мы переназначаем
// контекст функции от глобального (window) к null.






/*  2.
    Повторный bind

    Можем ли мы изменить this дополнительным связыванием?
    Что выведет этот код?
 */


function f2() {
    console.log(this.name);
}

f2 = f2.bind( {name: "Вася"} ).bind( {name: "Петя" } );

// f2();

// выведет "Вася"

// Экзотический объект bound function, возвращаемый при первом вызове f.bind(...), запоминает контекст (и аргументы, если они были переданы) только во время создания.
// Следующий вызов bind будет устанавливать контекст уже для этого объекта. Это ни на что не повлияет.
// Можно сделать новую привязку, но нельзя изменить существующую.






/*  3.
    Свойство функции после bind

    В свойство функции записано значение.
    Изменится ли оно после применения bind? Обоснуйте ответ.
 */

function sayHi() {
    console.log( this.name );
}
sayHi.test = 5;

const bound = sayHi.bind({
    name: "Вася"
});

console.log( bound.test ); // что выведет? почему?

// Ответ: undefined.
// Результатом работы bind является другой объект. У него уже нет свойства test.






/*  4.
    Исправьте функцию, теряющую "this"

    Вызов askPassword() в приведённом ниже коде должен проверить пароль и
    затем вызвать user.loginOk/loginFail в зависимости от ответа.

    Однако, его вызов приводит к ошибке. Почему?

    Исправьте выделенную строку, чтобы всё работало (других строк изменять не надо).

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'Вася',

      loginOk() {
        alert(`${this.name} logged in`);
      },

      loginFail() {
        alert(`${this.name} failed to log in`);
      },

    };

    askPassword(user.loginOk, user.loginFail);

 */

// Решение
function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

const user = {
    name: 'Вася',

    loginOk() {
        console.log(`${this.name} logged in`);
    },

    loginFail() {
        console.log(`${this.name} failed to log in`);
    },

};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
