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
