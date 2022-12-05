// Наследование классов

/*
    Наследование классов – это способ расширения одного класса другим классом.
    Таким образом, мы можем добавить новый функционал к уже существующему.
*/


class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} бежит со скоростью ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      console.log(`${this.name} стоит неподвижно.`);
    }
  }
  
const animal = new Animal("Мой питомец");

// extends

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} прячется!`);
  }
}

let rabbit = new Rabbit("Белый кролик");

rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.hide(); // Белый кролик прячется!






// Переопределение методов

class Rabbit extends Animal {
  stop() {
    // ...теперь это будет использоваться для rabbit.stop()
    // вместо stop() из класса Animal
  }
}

class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} стоит неподвижно.`);
  }

}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} прячется!`);
  }

  stop() {
    super.stop(); // вызываем родительский метод stop
    this.hide(); // и затем hide
  }
}

const rabbit = new Rabbit("Белый кролик");

rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!




// У стрелочных функций нет super
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
  }
}





// Переопределение конструктора
/*
  Конструкторы в наследуемых классах должны обязательно вызывать super(...), и (!) делать это перед использованием this..
*/

class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

}

const rabbit = new Rabbit("Белый кролик", 10);
console.log(rabbit.name); // Белый кролик
console.log(rabbit.earLength); // 10



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */


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




