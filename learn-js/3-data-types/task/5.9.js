// Object.keys, values, entries
// https://learn.javascript.ru/keys-values-entries


// Object.keys
const john = {
    name: "John",
    age: 30
};

for (let key of Object.keys(john)) {
    console.log(key); // ["name", "age"]
}




// Object.values
const michael = {
    name: "Michael",
    age: 22
};

for (let value of Object.values(michael)) {
    console.log(value) // "Michael", 22
}




// Object.entries
const dmitrii = {
    name: "Dmitrii",
    age: 36
}

for (let key of Object.entries(dmitrii)) {
    console.log(key) // [ 'name', 'Dmitrii' ] [ 'age', 36 ]
}




// Трансформации объекта
const prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

const doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

console.log(doublePrices.meat); // 8




// Сумма свойств объекта
// Напишите функцию sumSalaries(salaries), которая возвращает сумму
// всех зарплат с помощью метода Object.values и цикла for..of.
const salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSalaries(obj) {
    let sumAllValues = 0;
    for (let value of Object.values(obj)) {
        sumAllValues += value
    }
    return sumAllValues
}

console.log( sumSalaries(salaries) ); // 650




// Подсчёт количества свойств объекта
// Напишите функцию count(obj), которая возвращает количество свойств объекта:
const products = {
    phone: 'Apple Iphone',
    model: '13 plus',
};

function count(obj) {
    return Object.keys(obj).length;
}

console.log( count(products) ); // 2
