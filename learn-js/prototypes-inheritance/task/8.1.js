// Прототипное наследование
// https://learn.javascript.ru/prototype-inheritance
// Задачи


/*
    Работа с прототипами
    В приведённом ниже коде создаются и изменяются два объекта.
    Какие значения показываются в процессе выполнения кода?
 */

const animal = {
    jumps: null
};
const rabbit = {
    __proto__: animal,
    jumps: true
};

// console.log( rabbit.jumps ); // ? (1)  // Ответ:  true

delete rabbit.jumps;

// console.log( rabbit.jumps ); // ? (2)  // Ответ: null

delete animal.jumps;

// console.log( rabbit.jumps ); // ? (3) // Ответ: undefined






/*
    Алгоритм поиска

    Задача состоит из двух частей.
    У нас есть объекты:

    let head = {
      glasses: 1
    };

    let table = {
      pen: 3
    };

    let bed = {
      sheet: 1,
      pillow: 2
    };

    let pockets = {
      money: 2000
    };


    С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства выполнялся
    по следующему пути: pockets → bed → table → head. Например, pockets.pen должно возвращать
    значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).

    Ответьте на вопрос: как быстрее получить значение glasses – через pockets.glasses или через head.glasses?
    При необходимости составьте цепочки поиска и сравните их.
 */

const head = {
    glasses: 1
};

const table = {
    pen: 3,
    __proto__: head,
};

const bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table,
};

const pockets = {
    money: 2000,
    __proto__: bed,
};

console.log(pockets.pen)

// Ответьте на вопрос: как быстрее получить значение glasses – через pockets.glasses или через head.glasses?
/*
    С точки зрения производительности, для современных движков неважно,
    откуда берётся свойство – из объекта или из прототипа.
    Они запоминают, где было найдено свойство, и повторно используют его в следующем запросе.

    Например, при обращении к pockets.glasses они запомнят, что нашли glasses в head,
    и в следующий раз будут искать там же. Они достаточно умны, чтобы при изменениях
    обновлять внутренний кеш, поэтому такая оптимизация безопасна.
 */






/*
    Куда будет произведена запись?
    Объект rabbit наследует от объекта animal.
    Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?
 */


const animal1 = {
    eat() {
        this.full = true;
    }
};

const rabbit2 = {
    __proto__: animal1
};

rabbit2.eat();

//Ответ: rabbit.
// Поскольку this – это объект, который стоит перед точкой, rabbit.eat() изменяет объект rabbit.






/*
    Почему наедаются оба хомяка?
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // Этот хомяк нашёл еду
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // У этого хомяка тоже есть еда. Почему? Исправьте
    alert( lazy.stomach ); // apple

 */

// Причина такого поведения из за того что у хомяков один живот на двоих
//Решение

const hamster = {
    stomach: [],

    eat(food) {
        // присвоение значения this.stomach вместо вызова this.stomach.push
        this.stomach = [food];
    }
};

const speedy = {
    __proto__: hamster
};

const lazy = {
    __proto__: hamster
};

// Шустрый хомяк нашёл еду
speedy.eat("apple");
console.log( speedy.stomach ); // apple

// Живот ленивого хомяка пуст
console.log( lazy.stomach ); // <ничего>