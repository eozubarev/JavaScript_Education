// https://learn.javascript.ru/primitives-methods
//Методы примитивов

// ключевые различия между примитивами и объектами.
// Примитив
// Есть 7 примитивных типов: string, number, boolean, symbol, null, undefined и bigint.

// Объект
// Может хранить множество значений как свойства.
// Объявляется при помощи фигурных скобок {}, например: {name: "Рома", age: 30}.
// В JavaScript есть и другие виды объектов: например, функции тоже являются объектами.

//Одна из лучших особенностей объектов – это то, что мы можем хранить функцию как одно из свойств объекта.
const roma = {
    name: "Рома",
    sayHi: function() {
        alert("Привет, дружище!");
    }
};

roma.sayHi(); // Привет, дружище!



// Каждый примитив имеет свой собственный «объект-обёртку», которые называются:
// String, Number, Boolean, Symbol и BigInt. Таким образом, они имеют разный набор методов.
//К примеру, существует метод str.toUpperCase(), который возвращает строку в верхнем регистре.
const str = "Привет";
alert( str.toUpperCase() ); // ПРИВЕТ



// Особенные примитивы null и undefined являются исключениями.
// У них нет соответствующих «объектов-обёрток», и они не имеют никаких методов.
// В некотором смысле, они «самые примитивные».

//Попытка доступа к свойствам такого значения возвратит ошибку:
alert(null.test); // ошибка


// Формально эти методы работают с помощью временных объектов,
// но движки JavaScript внутренне очень хорошо оптимизируют этот процесс,
// так что их вызов не требует много ресурсов.