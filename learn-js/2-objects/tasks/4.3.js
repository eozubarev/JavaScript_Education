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



