/*
    Генераторы могут порождать (yield) множество значений одно за другим, по мере необходимости. 
    Генераторы отлично работают с перебираемыми объектами и позволяют легко создавать потоки данных.
*/

function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }
  
  // "функция-генератор" создаёт объект "генератор"
const generator = generateSequence();
console.log(generator); // [object Generator]

generator.next() // 1 // done: false
generator.next() // 2 // done: false
generator.next() // 3 // done: true
generator.next() // done: true
 
/* Результатом метода next() всегда является объект с двумя свойствами:

    value: значение из yield.
    done: true, если выполнение функции завершено, иначе false.
*/



// Перебор генераторов

function* generateSequence2() {
    yield 1;
    yield 2;
    return 3;
  }
  
  const generator2 = generateSequence2();
  
  for(let value of generator2) {
    console.log(value); // 1, затем 2
  }

/*
    Значение 3 выведено не будет!
    Это из-за того, что перебор через for..of игнорирует последнее значение, при котором done: true. 
    Поэтому, если мы хотим, чтобы были все значения при переборе через for..of, то надо возвращать их через yield:
*/

function* generateSequence3() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  const generator3 = generateSequence3();
  
  for(let value of generator3) {
    console.log(value); // 1, 2, 3
  }

  // spread

  function* generateSequence3() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  const sequence = [0, ...generateSequence3()];
  
  console.log(sequence); // 0, 1, 2, 3


// Использование генераторов для перебираемых объектов
const range = {
    from: 1,
    to: 5,
  
    *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
  };
  
  console.log( [...range] ); // 1,2,3,4,5



// Задача - Псевдослучайный генератор

function* pseudoRandom(seed) {
    let value = seed;
    
    while(true) {
      value = value * 16807 % 2147483647
      yield value;
    }
  
  };
  
  let generator4 = pseudoRandom(1);
  
  alert(generator4.next().value); // 16807
  alert(generator4.next().value); // 282475249
  alert(generator4.next().value); // 1622650073