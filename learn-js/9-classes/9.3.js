// Статические свойства и методы

class User {
    static staticMethod() {
        console.log(this === User);
    }
}

User.staticMethod(); // true

/* Тоже самое, что и

    class User { }
    User.staticMethod = function() {
      console.log(this === User);
    };

 */



class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB) {
        // this = Article
        return articleA.date - articleB.date;
    }
}

// использование
let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);
console.log( articles[0].title ); // CSS




// Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:
class News {
    static publisher = "Илья Кантор";
}

console.log( News.publisher ); // Илья Кантор

// Это то же самое, что и прямое присваивание Article:

Article.publisher = "Илья Кантор";



/* *** ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  ***  *** *** *** *** *** ***  */



// Задача с LearnJS
// https://learn.javascript.ru/static-properties-methods#tasks
/*
    Ниже пример кода с таким наследованием (почему он не работает? исправьте его):

    class Rabbit extends Object {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Кроль");

    alert( rabbit.hasOwnProperty('name') ); // Ошибка
 */

class Rabbit extends Object {
    constructor(name) {
        super(); // надо вызвать конструктор родителя, когда наследуемся
        this.name = name;
    }
}

let rabbit = new Rabbit("Кроль");

console.log( rabbit.hasOwnProperty('name') ); // true