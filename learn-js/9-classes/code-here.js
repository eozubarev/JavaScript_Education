class Car {
    constructor(model, color) {
        this.model = model;
        this.color = color;
    }
    getColor = () => {
        console.log('arrow func')
    }
}

const myCar = new Car('bmw', 'red')
myCar.getColor()
console.log(Car.prototype)