class Samurai {
    constructor(name) {
        this.name = name
    }
    hello() {
        console.log(this.name)
    }
}

let shougun = new Samurai('Дмитрий');
console.log(shougun.__proto__.__proto__ === Object.prototype);
console.log(shougun.__proto__.constructor.__proto__ === Object.constructor.prototype)
console.log(shougun.__proto__.__proto__.__proto__ === null);
