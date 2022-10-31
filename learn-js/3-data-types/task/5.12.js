// Формат JSON, метод toJSON
// https://learn.javascript.ru/json





// Преобразуйте объект в JSON, а затем обратно в обычный объект
// Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.
const user = {
    name: "Василий Иванович",
    age: 35
};
const user2 = JSON.parse(JSON.stringify(user));
console.log(user2)





// Исключить обратные ссылки
// Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup:

const room = {
    number: 23
};

const meetup = {
    title: "Совещание",
    occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
    place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

console.log( JSON.stringify(meetup, function replacer(key, value) {
   if (key != "" && value === meetup) {
       return undefined
   } else {
       return value
   }
}));

/* в результате должно быть:
{
  "title":"Совещание",
  "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
  "place":{"number":23}
}
*/