// Приватные и защищённые методы и свойства



// Защищённое свойство «waterAmount»
class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

}

// создаём новую кофеварку
let coffeeMachine = new CoffeeMachine(100);

// устанавливаем количество воды
coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды









// Свойство только для чтения «power»
class CoffeeMachine {
    // ...

    constructor(power) {
        this._power = power;
    }

    get power() {
        return this._power;
    }

}

// создаём кофеварку
const coffeeMachine = new CoffeeMachine(100);

console.log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

coffeeMachine.power = 25; // Error (no setter)







// Геттеры/сеттеры
// Здесь мы использовали синтаксис геттеров/сеттеров.
// Но в большинстве случаев использование функций get.../set... предпочтительнее:

class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) throw new Error("Отрицательное количество воды");
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);


/*
    Защищённые поля наследуются
    Если мы унаследуем class MegaMachine extends CoffeeMachine, ничто не помешает нам обращаться к
    this._waterAmount или this._power из методов нового класса.
 */






// Приватное свойство «#waterLimit»
class CoffeeMachine {
    #waterLimit = 200;

    #checkWater(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        if (value > this.#waterLimit) throw new Error("Слишком много воды");
    }
}

const coffeeMachine = new CoffeeMachine();

// снаружи  нет доступа к приватным методам класса
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error