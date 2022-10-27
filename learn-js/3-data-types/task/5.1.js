// Можно ли добавить свойство строке?

//Взгляните на следующий код:

const str = "Привет";
str.test = 5;
console.log(str.test);

// Как вы думаете, это сработает? Что выведется на экран?
// В зависимости от того, используете ли вы строгий режим (use strict) или нет, результат может быть:
// undefined (без strict)
// Ошибка (strict mode)

// Попытка обращения в null и undeined
console.log(null.toUpperCase()) // Cannot read properties of null (reading 'toUpperCase')
console.log(undefined.test) // Cannot read properties of undefined (reading 'test')


// Проверка с объектом
const person = {
    name: "Roman",
    age: 26,
    getPersonAge() {
        console.log(this.age)
    }
};

person.getPersonAge(); // 26


