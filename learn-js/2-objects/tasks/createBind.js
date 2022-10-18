// Как создать свой bind


let person = {
    name: 'Evgeny'
}

// Demo
function logInfo(email, phone) {
    console.log(`Имя: ${this.name} / E-mail: ${email} / Phone: ${phone}`)
}

// logInfo.bind(person)('ee@mai.ru', '123')
// logInfo.bind(person, 'ee@mai.ru',)('123')
// logInfo.bind(person, 'ee@mai.ru', '123')()




// 1. Простой
function bind (fn, context, ...rest) {
    return fn.bind(context, ...rest)
}

// bind(logInfo, person)('ee@mai.ru', '123')
// bind(logInfo, person, 'ee@mai.ru',)('123')
// bind(logInfo, person, 'ee@mai.ru', '123')()



// 2. Без встроенных методов
function bind2(fn, context, ...rest) {
    return function (...args) {
        const uniqId = Date.now().toString();
        context[uniqId] = fn;
        const result = context[uniqId](...rest.concat(args))
        delete context[uniqId]
        return result
    }
}

// bind2(logInfo, person)('ee@mai.ru', '123')
// bind2(logInfo, person, 'ee@mai.ru',)('123')
// bind2(logInfo, person, 'ee@mai.ru', '123')()



// 3. ES5
function bind3(fn, context) {
    const rest = Array.prototype.slice.call(arguments, 2)
    return function () {
        const args = Array.prototype.slice.call(arguments);
        return fn.apply(context, rest.concat(args))
    }
}

// bind3(logInfo, person)('ee@mai.ru', '123')
// bind3(logInfo, person, 'ee@mai.ru',)('123')
// bind3(logInfo, person, 'ee@mai.ru', '123')()



// 4. ES6
function bind4(fn, context, ...rest) {
    return function (...args) {
        return fn.apply(context, rest.concat(args))
    }
}

 bind4(logInfo, person)('ee@mai.ru', '123')
 bind4(logInfo, person, 'ee@mai.ru',)('123')
 bind4(logInfo, person, 'ee@mai.ru', '123')()