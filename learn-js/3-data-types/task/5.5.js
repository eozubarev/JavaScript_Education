// https://learn.javascript.ru/array-methods
// Методы массивов




// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
// То есть дефисы удаляются, а все слова после них получают заглавную букву.

// camelize("background-color") == 'backgroundColor';
// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';

// function camelize(str) {
//     const arr = str.split('');
//     const result = [];
//     for (let i = 0; i < arr.length; i++) {
//         const currentEl = arr[i]
//         if (currentEl != '-') {
//             result.push(currentEl)
//         } else {
//             const nextEl = arr[i + 1].toUpperCase()
//             result.push(nextEl)
//             i++
//         }
//     }
//     return result.join('')
// }

function camelize(str) {
    return str
        .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']

        // Переводит в верхний регистр первые буквы всех элементом массива за исключением первого
        // превращает ['my', 'long', 'word'] в ['my', 'Long', 'Word']
        .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))

        .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
}

console.log(camelize("background-color"))
console.log(camelize("list-style-image"))
console.log(camelize("-webkit-transition"))




// Фильтрация по диапазону
// Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет элементы со
// значениями больше или равными a и меньше или равными b и возвращает результат в виде массива.
// Функция должна возвращать новый массив и не изменять исходный.

function filteredRange(arr, a, b) {
    const result = arr.filter(item => item >= a && item <= b)
    return result
}

const arr = [5, 3, 8, 1];
const filtered = filteredRange(arr, 1, 4);
console.log( filtered ); // 3,1 (совпадающие значения)
console.log( arr ); // 5,3,8,1 (без изменений)




// Фильтрация по диапазону "на месте"
// Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет
// из него все значения кроме тех, которые находятся между a и b. То есть, проверка имеет вид a ≤ arr[i] ≤ b.
// Функция должна изменять принимаемый массив и ничего не возвращать.

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        // удаляем, если за пределами интервала
        if (val < a || val > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}

// slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).

const arr2 = [5, 3, 8, 1];
filterRangeInPlace(arr2, 1, 4); // удалены числа вне диапазона 1..4
console.log( arr2 ); // [3, 1]




// Сортировать в порядке по убыванию
const arr3 = [5, 2, 1, -10, 8];
arr3.sort((a, b) => b - a);
console.log( arr3 ); // 8, 5, 2, 1, -10




// Скопировать и отсортировать массив
// У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.
const arr4 = ["HTML", "JavaScript", "CSS"];

function copySorted(arr) {
    return arr.slice().sort();
}

const sorted = copySorted(arr4);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr4 ); // HTML, JavaScript, CSS (без изменений)

