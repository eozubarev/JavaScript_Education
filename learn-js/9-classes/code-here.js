class Rabbit extends Object {
    constructor(name) {
        super(); // надо вызвать конструктор родителя, когда наследуемся
        this.name = name;
    }
}

let rabbit = new Rabbit("Кроль");

console.log( rabbit.hasOwnProperty('name') ); // true