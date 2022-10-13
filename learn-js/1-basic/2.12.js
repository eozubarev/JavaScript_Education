// Оператор ?? возвращает первый аргумент, если он не null/undefined, иначе второй.
 // result = (a !== null && a !== undefined) ? a : b;

 let firstName = null;
 let lastName = null;
 let nickName = "Суперкодер";
 
 alert(firstName ?? lastName ?? nickName ?? "Аноним"); // Суперкодер

 let height = 0;

 alert(height || 100); // 100
 alert(height ?? 100); // 0