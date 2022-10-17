// Task 1. Создайте объект calculator (калькулятор) с тремя методами:

// read() (читать) запрашивает два значения и сохраняет их как свойства объекта.
// sum() (суммировать) возвращает сумму сохранённых значений.
// mul() (умножить) перемножает сохранённые значения и возвращает результат.


let calculator = {
    read() {
        this.numOne = +prompt('Enter number one', '');
        this.numTwo = +prompt('Enter number two', '');
    },
    sum() {
        return this.numOne + this.numTwo;
    },
    multiply() {
        return this.numOne * this.numTwo;
    },
};

calculator.read();
alert(calculator.sum());
alert(calculator.multiply());


// Task 2. Цепь вызовов
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this; // каждый раз возвращает сам объект
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        alert( this.step );
        return this;
    }
};

ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0




/* My Tasks */

// Поверхностное копирование, только примитивы с помощью for in
// Поверхностное копирование работает быстро и в большинстве случаев его достаточно.
// Проблемы появляются, когда приходится копировать вложенные структуры

const user = {
    name: 'Jenya',
    age: 25,
    skils: ['html', 'css', 'js']
};

const clone = {};

for (let key in user) {
    clone[key] = user[key]
}

// Что если изменить имя в объекте клона и добавить ещё один скилл в массив skills
clone.name = 'Peter';
clone.skils.push('react');

console.log(clone) // { name: 'Peter', age: 25, skils: [ 'html', 'css', 'js', 'react' ] }
console.log(user) // { name: 'Jenya', age: 25, skils: [ 'html', 'css', 'js', 'react' ] }

// Ожидаемый результат.
// Т.к. массив тоже является объектом, то он хранит в себе ссылку в памяти
// При попытки копирования user в clone и изменении набор элементов в массиве skills
// skill 'react' добавился в оба массива, а примитив name, изменился только в clone




// Как получить глубокую копию
// JavaScript не содержит отдельных функций для глубокого копирования массивов или объектов.
// Существуют различные способы сделать глубокое копирование. Например cloneDeep from 'lodash'

// Поверхностное копирование с помощью Object.assign
const user2 = {
    name: 'Andrey',
    age: 34,
    skills: ['react', 'vue', 'docker']
}

const clone2 = {};

Object.assign(clone2, [user, user2])

console.log(clone2)
// {
//     '0': { name: 'Jenya', age: 25, skils: [ 'html', 'css', 'js', 'react' ] },
//     '1': { name: 'Andrey', age: 34, skills: [ 'react', 'vue', 'docker' ] }
// }




