// https://www.youtube.com/watch?v=b55hiUlhAzI&t=1014s

// 1
console.log( ({}).prototype === ({}.__proto__) ) //? // Ответ: false

// 2
function EvgenyLearn() {
    console.log( EvgenyLearn.prototype === EvgenyLearn.__proto__ ) //?  // Ответ: false
}

// 3
function EvgenyLearn() {}
function EvgenyLearnJS() {}
console.log( EvgenyLearn.__proto__ === EvgenyLearnJS.__proto__ ) // ? // Ответ: true
console.log( EvgenyLearn.prototype === EvgenyLearnJS.prototype ) // ? // Ответ: false

// 4
const Component = (props) => {
    return `<div>Hello</div>`
}
console.log( Component.prototype === Object.prototype ) // ? // Ответ: false

// 5
let age = 18;
console.log( age.prototype === Number.prototype ) // ? // Ответ: false
console.log( age.__proto__ === Number.prototype ) // ? // Ответ: true

// 6
class Programmer {}
console.log( Programmer.__proto__ === Function.prototype ) // ? // Ответ: true

// 7
function EvgenyLearn() {}
console.log( EvgenyLearn.__proto__ === ??? ) // ? // Ответ: Function.prototype

// 8
const count = 12
console.log( count.__proto__ === ??? ) // ? // Ответ: Number.prototype



class Samurai {
    constructor(name) {
        this.name = name
    }
    hello() {
        console.log(this.name)
    }
}

let shougun = new Samurai('Дмитрий');
console.log(shougun.__proto__.__proto__ === Object.prototype); // true
console.log(shougun.__proto__.constructor.__proto__ === Object.constructor.prototype) // true
console.log(shougun.__proto__.__proto__.__proto__ === null); // true



