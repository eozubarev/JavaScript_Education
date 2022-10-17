// 1. Привет, object
// Создайте пустой объект user.
// Добавьте свойство name со значением John.
// Добавьте свойство surname со значением Smith.
// Измените значение свойства name на Pete.
// Удалите свойство name из объекта.

let user = {
    name: 'John',
    surname: 'Smith'
}

user.name = 'Pete';
console.log(user) // name : "Pete"

delete user.name
console.log(user) // { surname: 'Smith' }

/* ====================================================================== */

// 2. Проверка на пустоту
// Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false.
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

/* ====================================================================== */

// 3.Объекты-константы?
// Можно ли изменить объект, объявленный с помощью const? Как вы думаете?
// Можно изменить значение объекта, нельзя изменять ссылку на сам объект в переменной const user
const user2 = {
    name: "John"
};
user2.name = "Pete";
console.log(user2) // Перезапишет Pete -> John

const moderator = {
    name: 'Valera'
}

// user2 = moderator; // TypeError: Assignment to constant variable.

/* ====================================================================== */

// 4. Сумма свойств объекта
// У нас есть объект, в котором хранятся зарплаты нашей команды:

    let salaries = {
        John: 100,
        Ann: 100,
        Pete: 100
    }

// Напишите код для суммирования всех зарплат и сохраните результат в переменной sum. Должно получиться 390.
// Если объект salaries пуст, то результат должен быть 0.

function sum(obj) {
    let sum = 0;
    for (let key in obj) {
        sum += obj[key];
    }
    return sum
}

sum(salaries) // 300

/* ====================================================================== */

// 5. Умножаем все числовые свойства на 2
// Создайте функцию multiplyNumeric(obj), которая умножает все числовые свойства объекта obj на 2.
// Обратите внимание, что multiplyNumeric не нужно ничего возвращать. Следует напрямую изменять объект.

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

function multiplyNumeric(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "number") {
            obj[key] = obj[key] * 2
        }
    }
    return obj
}

multiplyNumeric(menu)


// 6. Найти вес всех вещей, цена которых более 80 и количество менее 7

const foods = [
    {name: 'Паста болоньезе', weight: 350, price: 33, quanity: 3},
    {name: 'Спаггети', weight: 350, price: 56, quanity: 8},
    {name: 'Суп', weight: 400, price: 68, quanity: 16},
    {name: 'Пицца', weight: 675, price: 139, quanity: 30},
    {name: 'Молоко', weight: 1600, price: 339, quanity: 8},
    {name: 'Овощи', weight: 740, price: 159, quanity: 1}, // +
    {name: 'Сыр', weight: 230, price: 99, quanity: 4},
    {name: 'Мука', weight: 230, price: 69, quanity: 5},
]

let allWeight = 0;

for (let i = 0; i < foods.length; i++) {
    const product = foods[i];
    if (product.price > 80 && product.quanity < 7) {
        allWeight += product.weight
    }
}
