/*
    Добавьте toString в словарь
    Имеется объект dictionary, созданный с помощью Object.create(null) для хранения любых пар ключ/значение.
    Добавьте ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой.
    Ваш toString не должен выводиться при итерации объекта с помощью цикла for..in.

    Вот так это должно работать:

    let dictionary = Object.create(null);

    // ваш код, который добавляет метод dictionary.toString

    // добавляем немного данных
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

    // только apple и __proto__ выведены в цикле
    for(let key in dictionary) {
      alert(key); // "apple", затем "__proto__"
    }

    // ваш метод toString в действии
    alert(dictionary); // "apple,__proto__"

 */

const dictionary = Object.create(null, {
    toString: { // определяем свойство toString
        value() { // значение -- это функция
            return Object.keys(this).join();
        }
    }
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple и __proto__ выведены в цикле
for(let key in dictionary) {
    console.log(key); // "apple", затем "__proto__"
}

// список свойств, разделённых запятой, выведен с помощью toString
console.log(dictionary); // "apple,__proto__"







/*
    Разница между вызовами

    Давайте создадим новый объект rabbit:

    function Rabbit(name) {
      this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
      alert(this.name);
    };

    let rabbit = new Rabbit("Rabbit");

    Все эти вызовы делают одно и тоже или нет?

    rabbit.sayHi();
    Rabbit.prototype.sayHi();
    Object.getPrototypeOf(rabbit).sayHi();
    rabbit.__proto__.sayHi();

 */

// в первом вызове this == rabbit, во всех остальных this равен Rabbit.prototype, так как это объект перед точкой.
// первый вызов выведет Rabbit, а остальные – undefined:

function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.sayHi = function() {
    console.log( this.name );
}

const rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined