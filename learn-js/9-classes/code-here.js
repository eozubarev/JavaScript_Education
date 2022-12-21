class Car {
    constructor(model, color) {
        this.model = model;
        this.color = color;
    }
    #anyProp = 'anyprop';
}

const myCar = new Car('bmw', 'red')
