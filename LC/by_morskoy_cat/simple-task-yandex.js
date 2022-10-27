/* 
    Пятеро друзей купили билеты на концерт Моргенштерна. 
    Мы собрали их данные в массив, где у каждого пользователя 
    есть свойство age — возраст. Посчитайте средний возраст целевой аудитории артиста.
    Ответ должен быть округлён к ближайшему целому.
*/
const data = [
    {
        name: "Саша",
        age: 19,
        info: {
            city: "Moscow",
            tel: "8-999-444-3312",
            quantityReposts: {
                vk: 21,
                dzen: 3,
                telegram: 1,
            },
        },
    },
    {
        name: "Катя",
        age: 21,
        info: {
            city: "Ryzan",
            tel: "8-939-144-1322",
            quantityReposts: {
                vk: 1,
                dzen: 4,
                telegram: 0,
            },
        },
    },
    {
        name: "Миша",
        age: 17,
        info: {
            city: "Omsk",
            tel: "8-993-321-9833",
            quantityReposts: {
                vk: 0,
                dzen: 1,
                telegram: 8,
            },
        },
    },
    {
        name: "Федя",
        age: 23,
        info: {
            city: "Moscow",
            tel: "8-992-121-2233",
            quantityReposts: {
                vk: 3,
                dzen: 2,
                telegram: 1,
            },
        },
    },
    {
        name: "Клава",
        age: 22,
        info: {
            city: "Saint Petersburg",
            tel: "8-931-221-2243",
            quantityReposts: {
                vk: 2,
                dzen: 1,
                telegram: 0,
            },
        },
    },
];

/* Output
    'Средний возраст аудитории Моргенштерна: 20'
*/

function calculateAverageAge() {
    // code here
}





// Решение

  
function calcAvgAge(array) {
    let totalSumAges = 0;
    let numberAllTickets = 0;
  
    array.reduce((prevValue, currentValue, index) => {
        if (index >= 0) {
            numberAllTickets += 1; // Кол-во билетов
        }
        totalSumAges += currentValue.age; // Сумма всех возрастов
    }, 0);
  
    let averageAge = totalSumAges / numberAllTickets;
  
    // Округляем если потребуется
      if (Number.isInteger(averageAge)) {
          console.log(averageAge);
      } else {
          console.log(Math.round(averageAge));
      }
  
    // Без округления
      // return averageAge
  }

  calcAvgAge(data)
  