// 1. Когда лучше юзать for of, а когда for in ? Отличия?

// for of позволяет нам итерироваться по объекту, брать значения объекта и делать некие манипуляции
// за счет подмешивания в объект Symbol.iterator

// Мы хотим, чтобы работал for..of:
// for(let num of range) ... num=1,2,3,4,5
let range = {
    from: 1,
    to: 5
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function() {

    // ...она возвращает объект итератора:
    // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
    return {
        current: this.from,
        last: this.to,

        // 3. next() вызывается на каждой итерации цикла for..of
        next() {
            // 4. он должен вернуть значение в виде объекта {done:.., value :...}
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

// теперь работает!
for (let num of range) {
    console.log(num); // 1, затем 2, 3, 4, 5
}


// Объекты, которые можно использовать в цикле for..of, называются итерируемыми.
// Технически итерируемые объекты должны иметь метод Symbol.iterator.

// Объекты, имеющие индексированные свойства и length, называются псевдомассивами.
// Они также могут иметь другие свойства и методы, но у них нет встроенных методов массивов.




// 2. Что будет если итерировать объект For of-ом ?
const auto = {
    name: 'Tesla',
    color: 'red',
    year: 2020
}

// for (const car of auto) {
// console.log(car) // TypeError: auto is not iterable
// }
// Проблема в том, что for of сразу обращается к св-ву, по определёному индексу
// тоесть везде где есть length

// Исправить можно следующим образом
for (const car of Object.keys(auto)) {
    console.log(car)
}
// но если просто нужно вывести значения по порядку , лучше использовать for in





// 3. Есть отличия в синтаксисе и основной логики взаимодействия
// for of лучше использовать в случаях, когда мы хотим что либо проитерировать в объектах
// for of обращается и выводит конкретные элементы не опираясь на их индекс for (const item in arr)
// for in позволяет обратится как к определёному индексу так и ключу если работаетаем с объектом
