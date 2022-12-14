// https://learn.javascript.ru/array
// Массивы

// Объекты позволяют хранить данные со строковыми ключами.
// Массивы это упорядоченная коллекция данных

// Существует два варианта синтаксиса для создания пустого массива:
const arr1 = [];
const arr2 = new Array();

// Практически всегда используется второй вариант синтаксиса.
// В скобках мы можем указать начальные значения элементов:
const fruits = ["Яблоко", "Апельсин", "Слива"];

// Элементы массива нумеруются, начиная с нуля.
// Мы можем получить элемент, указав его номер в квадратных скобках:
console.log( fruits[0] ); // Яблоко
console.log( fruits[1] ); // Апельсин
console.log( fruits[2] ); // Слива


// В массиве могут храниться элементы любого типа.
// разные типы значений
let arr3 = [ 'Яблоко', { name: 'Джон' }, true, function() { alert('привет'); } ];


// Методы pop/push, shift/unshift
// pop удаляет последний элемент.
// push добавляет элемент в конец.
// shift удаляет элемент в начале, сдвигая очередь, так что второй элемент становится первым.
// unshift Добавляет элемент в начало массива:

const fruits2 = ["Яблоко", "Апельсин", "Груша"];
alert( fruits2.pop() ); // удаляем "Груша" и выводим его
alert( fruits2 ); // Яблоко, Апельсин

const fruits3 = ["Яблоко", "Апельсин"];
fruits3.push("Груша");
alert( fruits3 ); // Яблоко, Апельсин, Груша

const fruits4 = ["Яблоко", "Апельсин", "Груша"];
alert( fruits4.shift() ); // удаляем Яблоко и выводим его
alert( fruits4 ); // Апельсин, Груша

const fruits5 = ["Апельсин", "Груша"];
fruits5.unshift('Яблоко');
alert( fruits5 ); // Яблоко, Апельсин, Груша




// Внутреннее устройство массива

// Массив – это особый подвид объектов. Квадратные скобки, используемые для того,
// чтобы получить доступ к свойству arr[0] – это по сути обычный синтаксис доступа по ключу, как obj[key]

// Массивы расширяют объекты, так как предусматривают специальные методы для работы с упорядоченными
// коллекциями данных, а также свойство length. Но в основе всё равно лежит объект.
// Следует помнить, что в JavaScript существует 8 основных типов данных.
// Массив является объектом и, следовательно, ведёт себя как объект.

const fruits6 = ["Банан"]
const arr = fruits6; // копируется по ссылке (две переменные ссылаются на один и тот же массив)
alert( arr === fruits6 ); // true
arr.push("Груша"); // массив меняется по ссылке
alert( fruits6 ); // Банан, Груша - теперь два элемента



// Для массивов возможен и другой вариант цикла, for..of:
// проходит по значениям
for (let fruit of fruits) {
    alert( fruit );
}

// Цикл for..of не предоставляет доступа к номеру текущего элемента, только к его значению,
// но в большинстве случаев этого достаточно. А также это короче.
// Технически, так как массив является объектом, можно использовать и вариант for..in:

for (let key in arr) {
    alert( arr[key] ); // Яблоко, Апельсин, Груша
}

// Но на самом деле это – плохая идея. Существуют скрытые недостатки этого способа:
// Цикл for..in выполняет перебор всех свойств объекта, а не только цифровых.
// Цикл for..in оптимизирован под произвольные объекты, не массивы, и поэтому в 10-100 раз медленнее.