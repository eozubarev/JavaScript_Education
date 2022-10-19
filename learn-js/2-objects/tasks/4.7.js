// Тип данных Symbol
// https://learn.javascript.ru/symbol

// К примеру я хочу сделать некую библиотеку и есть ряд св-в, которые я хочу защитить от
// случайного перезаписывания

const uniqId = Symbol('uniqId');
const anyLibrary = {
    [uniqId] : 'Здесь описывается очень важное св-во, которое нельзя перезаписать',
    name : 'Название библиотеки',
    version : 1,
    anyMethods() {
        console.log('какой-то важный метод')
    },
    sayNameLib() {
        console.log(this.name)
    }

}

// пытаемся на прямую получить доступ к св-ву
// console.log(anyLibrary[uniqId])

// делаем манипуляции с помощью for in
for (const key in anyLibrary) {
    console.log(key) // св-во [uniqId] сюда не попадает
    console.log('на каждый итерации что-то делаем со св-ми')
}