// Глава 4 Road Map

// 1. Что такое this?
// This - это некий динамический контекст, который определяется во время исполнения кода
// и указывает на объект слева от точки

// a
const user = {
    name: 'Mike',
    age: 25,
    sayHello() {
        console.log(this.name) // "this" - это "текущий объект".
    }
}
user.sayHello(); // Mike

// b
const admin = user;
admin.name = 'Dmitry'
admin.sayHello() // Dmitry




// 2. Как "потерять" this?
// Вложенные функции (Nested Functions)
// this теряет ссылку на контекст внутри вложенных функций.

const moderator = {
    name: 'Dmitry',
    skils: ['VueJs', 'React', 'Angular', 'rxJS'],
    doSomething () {
        setTimeout(function doAnotherThing(){
            this.skils.forEach(function log(skil){
                //Cannot read property 'forEach' of undefined
                console.log(skil);
                console.log(this.name);
            });
        }, 100);
    }
}

moderator.doSomething() // TypeError: Cannot read properties of undefined (reading 'forEach')



// 3. Как "не терять" this?
// a. Один из способов решения проблемы – метод bind().

/*
    doSomething(){
        setTimeout(function doAnotherThing(){
            this.numbers.forEach(function log(number){
                console.log(number);
                console.log(this.token);
            }.bind(this));
        }.bind(this), 100);
    }
*/

// bind() создает новую версию функции, которая при вызове уже имеет определенное значение this.
// function doAnotherThing(){ /*…*/}.bind(this) создает версию функции doAnotherThing(),
// которая берет значение this из doSomething().


// b. Другой вариант – объявить и использовать новую переменную that/self,
//    которая будет хранить значение this из метода doSomething().

// Нужноб объявлять let that = this во всех методах, использующих this во вложенных функциях.

/*
    doSomething() {
       const self = this;
       setTimeout(function doAnotherThing() {
          that.skils.forEach(function log(skil){
             console.log(skil);
             console.log(that.name);
          });
        }, 100);
      }
 */


// c. Стрелочные функции (Arrow function)

/*
    doSomething(){
       setTimeout(() => {
         this.skils.forEach(skil => {
             console.log(skil);
             console.log(this.name);
          });
        }, 100);
      }
 */

// Недостаток этого способа в том, что мы не можем задать имя стрелочной функции.
// Имя функции играет важную роль, так как повышает читабельность кода и описывает её назначение.

// Ниже представлен тот же код с функцией, выраженной через имя переменной:
/*
    doSomething(){
       let log = skil => {
         console.log(skil);
         console.log(this.name);
       }

       let doAnotherThing = () => {
         this.skils.forEach(log);
       }

       setTimeout(doAnotherThing, 100);
    }
 */


//
// Итог
//
// this теряет ссылку на контекст в различных ситуациях.
// bind(), использование переменной that/self и стрелочные функции — это способы решения проблем с контекстом.