// Преобразование типов
// Какой результат будет в следующем списке выражений? Проверьте ваши знания о том, как работает приведение типов в JavaScript.

true + false            //1
8 / "2"                 //4
"number" + 5 + 1        // number51
5 + 1 + "number"        // 6number
7 && 2                  // 22
2 && 7                  // 7
null + 1                // 1 (0 + 1 = 1)
undefined + 1           // NaN (NaN + 1)
"five" + + "two"        // fiveNaN ("five" + (+"two"))=> "five" + NaN
'true' == true          // false (NaN == 1 => false)
false == 'false'        // false (0 == NaN => false)
null == ''              // false
!!"false" == !!"true"   // true (true == true)
"4" - 3                 // 1
"4px" - 3               // NaN
0 || "0" && 1           // 1
