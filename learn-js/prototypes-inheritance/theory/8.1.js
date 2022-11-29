// Прототипное наследование
// https://learn.javascript.ru/prototype-inheritance

// Прототип даёт нам немного «магии». Когда мы хотим прочитать свойство из object, а оно отсутствует,
// JavaScript автоматически берёт его из прототипа. В программировании такой механизм называется «прототипным наследованием».

const animal = {
    eats: true
};
const rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

// Если мы ищем свойство в rabbit, а оно отсутствует, JavaScript автоматически берёт его из animal.

const animal = {
    eats: true
};
const rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // (*)

// теперь мы можем найти оба свойства в rabbit:
console.log( rabbit.eats ); // true (**)
console.log( rabbit.jumps ); // true


// Если у нас есть метод в animal, он может быть вызван на rabbit:

const animal = {
    eats: true,
        walk() {
            console.log("Animal walk");
    }
};

const rabbit = {
    jumps: true,
    __proto__: animal
};

// walk взят из прототипа
rabbit.walk(); // Animal walk



//Цепочка прототипов может быть длиннее:

const animal = {
    eats: true,
    walk() {
        console.log("Animal walk");
    }
};

const rabbit = {
    jumps: true,
    __proto__: animal
};

const longEar = {
    earLength: 10,
    __proto__: rabbit
};

// walk взят из цепочки прототипов
longEar.walk(); // Animal walk
console.log(longEar.jumps); // true (из rabbit)


/*
    Свойство __proto__ немного устарело, оно существует по историческим причинам.
    Современный JavaScript предполагает, что мы должны использовать функции
    Object.getPrototypeOf/Object.setPrototypeOf вместо того, чтобы получать/устанавливать прототип.
    Мы также рассмотрим эти функции позже.
 */



// Операция записи не использует прототип
// Прототип используется только для чтения свойств.
const animal = {
    eats: true,
    walk() {
        /* этот метод не будет использоваться в rabbit */
    }
};

const rabbit = {
    __proto__: animal
};

rabbit.walk = function() {
    console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!



// Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером.
// То есть это фактически вызов функции.

// По этой причине admin.fullName работает корректно в приведённом ниже коде:

    const user = {
        name: "John",
        surname: "Smith",

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

const admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// срабатывает сеттер!
admin.fullName = "Alice Cooper"; // (**)
console.log(admin.name); // Alice
console.log(admin.surname); // Cooper


// Здесь в строке (*) свойство admin.fullName имеет геттер в прототипе user, поэтому вызывается он.
// В строке (**) свойство также имеет сеттер в прототипе, который и будет вызван.




/*
    Значение «this»
    В приведённом выше примере может возникнуть интересный вопрос: каково значение this внутри set fullName(value)?
    Куда записаны свойства this.name и this.surname: в user или в admin?
    Ответ прост: прототипы никак не влияют на this.
 */

// Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.

// методы animal
const animal = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

const rabbit = {
    name: "White Rabbit",
    __proto__: animal
};

// модифицирует rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (нет такого свойства в прототипе)




/*
    Цикл for…in
    Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.
 */


const animal = {
    eats: true
};

const rabbit = {
    jumps: true,
    __proto__: animal
};

// Object.keys возвращает только собственные ключи
console.log(Object.keys(rabbit)); // jumps

// for..in проходит и по своим, и по унаследованным ключам
for(let prop in rabbit) console.log(prop); // jumps, затем eats

/*
    Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи
    встроенного метода obj.hasOwnProperty(key): он возвращает true, если у obj есть
    собственное, не унаследованное, свойство с именем key.
 */


const animal = {
    eats: true
};

const rabbit = {
    jumps: true,
    __proto__: animal
};

for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);

    if (isOwn) {
        console.log(`Our: ${prop}`); // Our: jumps
    } else {
        console.log(`Inherited: ${prop}`); // Inherited: eats
    }
}