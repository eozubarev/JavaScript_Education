// Наследование классов
// Задачи

/*  с LearnJS
    Ошибка создания экземпляра класса
    В коде ниже класс Rabbit наследует Animal.
    К сожалению, объект класса Rabbit не создаётся. Что не так? Исправьте ошибку.

    class Animal {

      constructor(name) {
        this.name = name;
      }

    }

    class Rabbit extends Animal {
      constructor(name) {
        this.name = name;
        this.created = Date.now();
      }
    }

    let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
    alert(rabbit.name);

*/

class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Rabbit extends Animal {
    constructor(name) {
        super(name) // Не хватало super()
        this.name = name;
        this.created = Date.now();
    }
}

const rabbit = new Rabbit("Белый кролик"); // Белый кролик
console.log(rabbit.name);







/*
    Реализуйте класс Worker (Работник), который будет иметь следующие свойства: name (имя), surname (фамилия),
    rate (ставка за день работы), days (количество отработанных дней). Также класс должен иметь метод getSalary(),
    который будет выводить зарплату работника. Зарплата - это произведение (умножение)
    ставки rate на количество отработанных дней days.
 */

class Worker {
    constructor(name, surname, rate, days) {
        this.name = name;
        this.surname = surname;
        this.rate = rate;
        this.days = days;
    }

     getSalary() {
        const calcSalary = this.rate * this.days;
        console.log(calcSalary)
    }

}

const andrey = new Worker('Андрей', 'Попов',100,22);
andrey.getSalary()




