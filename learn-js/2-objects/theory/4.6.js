// Опциональная цепочка ?. — это безопасный способ доступа к
// свойствам вложенных объектов, даже если какое-либо из промежуточных свойств не существует.

let user = {}; // пользователь без свойства "address"
alert(user.address.street); // Ошибка!

// Это ожидаемый результат. JavaScript работает следующим образом.
// Поскольку user.address имеет значение undefined, попытка получить user.address.street завершается ошибкой.


// Очевидным решением было бы проверить значение с помощью if или
// условного оператора ?, прежде чем обращаться к его свойству, вот так:

let user = {};
alert(user.address ? user.address.street : undefined);
// Это работает, тут нет ошибки… Но это неэлегантно.
// "user.address" появляется в коде дважды.


// Опциональная цепочка ?. останавливает вычисление и
// возвращает undefined, если значение перед ?. равно undefined или null.

let user2 = {}; // пользователь без адреса
alert( user?.address?.street ); // undefined (без ошибки)


// Или с Dom элементами
let html = document.querySelector('.elem')?.innerHTML; // будет undefined, если элемента нет



//Считывание адреса с помощью user?.address работает, даже если объект user не существует:

let user = null;
alert( user?.address ); // undefined
alert( user?.address.street ); // undefined

// Обратите внимание: синтаксис ?. делает необязательным значение перед ним, но не какое-либо последующее.


// итого
// Синтаксис опциональной цепочки ?. имеет три формы:
// obj?.prop – возвращает obj.prop если obj существует, в противном случае undefined.
// obj?.[prop] – возвращает obj[prop] если obj существует, в противном случае undefined.
// obj.method?.() – вызывает obj.method(), если obj.method существует, в противном случае возвращает undefined.
