/*
    Напишите функцию printNumbers(from, to), 
    которая выводит число каждую секунду, начиная от from и заканчивая to.

    Сделайте два варианта решения.
    Используя setInterval.
    Используя рекурсивный setTimeout.
*/

function printNumbersInterval(from, to) {
    let current = from;

    const timerId = setInterval(() => {
        console.log(current);
        if (current === to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}

// printNumbersInterval(5, 10);


function printNumberTimeout(from, to) {
    let current = from;

    const timeId = setTimeout(() => {
        console.log(current)
        if (current === to) {
            clearTimeout(timerId)
        }
        timeId();
    }, 1000)
}

printNumbersInterval(5, 10);



/*
    Что покажет setTimeout?

    В приведённом ниже коде запланирован вызов setTimeout, а затем выполняется
    сложное вычисление, для завершения которого требуется более 100 мс.

    Когда будет выполнена запланированная функция?
        После цикла.
        Перед циклом.
        В начале цикла.

    Что покажет console.log?

 */

let i = 0;
setTimeout(() => console.log(i), 100); // ?

// предположим, что время выполнения этой функции >100 мс
for(let j = 0; j < 100000000; j++) {
    i++;
}

// Ответ 100000000
// т.к. любой вызов setTimeout будет выполнен только после того, как текущий код завершится.
